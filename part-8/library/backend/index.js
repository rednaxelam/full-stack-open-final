const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const { GraphQLError } = require('graphql')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }


  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`

const performSaveToDB = async (asyncCallback) => {
  try {
    const result = await asyncCallback()
    return result
  } catch (error) {
    throw new GraphQLError(error.message, {
      extensions: {
        code: "BAD_USER_INPUT",
        error,
      }
    })
  }
}

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      if (!args.author && !args.genre) return books
      else if (args.author && !args.genre) return books.filter(book => args.author === book.author.name)
      else if (!args.author && args.genre) return books.filter(book => book.genres.includes(args.genre))
      else return books.filter(book => args.author === book.author.name).filter(book => book.genres.includes(args.genre))
    },
    allAuthors: async () => Author.find({}),
    me: async (obj, args, context) => context.hasOwnProperty('currentUser') ? context.currentUser : null
  },

  Author: {
    bookCount: async (author) => {
      const books = await Book.find({author: author._id})
      return books.length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) throw new GraphQLError('You must be signed in to perform this operation', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })

      const authorsWithName = await Author.find({name: args.author})
      if (authorsWithName.length === 0) {
        const newAuthor = new Author({name: args.author})
        const savedAuthor = await performSaveToDB(async () => newAuthor.save())
        const newBook = new Book({...args, author: savedAuthor._id})
        const savedBook = await performSaveToDB(async () => newBook.save())
        return savedBook.populate('author')
      } else {
        const author = authorsWithName[0]
        const newBook = new Book({...args, author: author._id})
        const savedBook = await performSaveToDB(async () => newBook.save())
        return savedBook.populate('author')
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) throw new GraphQLError('You must be signed in to perform this operation', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })

      let authorToEdit = await Author.find({name: args.name})
      if (authorToEdit.length === 0) return null
      else {
        authorToEdit = authorToEdit[0]
        authorToEdit.born = args.setBornTo
        const savedAuthor = await performSaveToDB(async () => authorToEdit.save())
        return savedAuthor
      }
    },
    createUser: async (root, args) => {
      let newUser = new User({...args})
      const savedUser = await performSaveToDB(async () => newUser.save())
      return savedUser
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if (!user || args.password !== 'password') {
        throw new GraphQLError('Invalid login details', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.SECRET)}
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
    return { currentUser: null }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})