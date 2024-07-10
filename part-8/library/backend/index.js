const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
require('dotenv').config()
const Author = require('./models/author')
const Book = require('./models/book')

const mongoose = require('mongoose')

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
  }
`

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
  },

  Author: {
    bookCount: async (author) => {
      const books = await Book.find({author: author._id})
      return books.length
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      const authorsWithName = await Author.find({name: args.author})
      if (authorsWithName.length === 0) {
        const newAuthor = new Author({name: args.author})
        const savedAuthor = await newAuthor.save()
        const newBook = new Book({...args, author: savedAuthor._id})
        const savedBook = await newBook.save()
        return savedBook.populate('author')
      } else {
        const author = authorsWithName[0]
        const newBook = new Book({...args, author: author._id})
        const savedBook = await newBook.save()
        return savedBook.populate('author')
      }
    },
    editAuthor: async (root, args) => {
      let authorToEdit = await Author.find({name: args.name})
      if (authorToEdit.length === 0) return null
      else {
        authorToEdit = authorToEdit[0]
        authorToEdit.born = args.setBornTo
        const savedAuthor = await authorToEdit.save()
        return savedAuthor
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})