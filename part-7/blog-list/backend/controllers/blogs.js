const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  let blogs = await Blog.find({}).populate('user', { blogs: 0 })

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const blogObject = request.body

  const user = await User.findById(request.userId)

  if (!Object.hasOwn(blogObject, 'title')) {
    response.status(400).json({ error: 'title missing' })
    return
  } else if (!Object.hasOwn(blogObject, 'url')) {
    response.status(400).json({ error: 'url missing' })
    return
  }

  blogObject.user = user._id

  const blog = new Blog(blogObject)
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user = await User.findById(request.userId)

  if (!blog) {
    return response.status(204).json({ warning: 'no blog was found with given id' })
  }

  if (request.userId !== blog.user.toString()) {
    return response.status(401)
      .json({ error: 'delete request unauthorized - only the user who added the blog entry can delete it' })
  }

  await blog.deleteOne()

  user.blogs = user.blogs.filter(blogId => blogId.toString() !== request.params.id)
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  if (!Object.hasOwn(request.body, 'title')) {
    response.status(400).json({ error: 'title missing' })
    return
  } else if (!Object.hasOwn(request.body, 'url')) {
    response.status(400).json({ error: 'url missing' })
    return
  }

  const blogsWithID = await Blog.find({ _id: request.params.id }).exec()
  if (blogsWithID.length < 1) {
    response.status(404).json({ error: 'blog not found' })
    return
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })

  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const getRandomInteger = () => Math.floor(Math.random() * 100000000)

  if (!Object.hasOwn(request.body, 'comment')) {
    response.status(400).json({ error: 'comment missing' })
    return
  }

  const commentObject = request.body

  const blogsWithID = await Blog.find({ _id: request.params.id }).exec()
  if (blogsWithID.length < 1) {
    response.status(404).json({ error: 'blog not found' })
    return
  }

  const blogToUpdate = blogsWithID[0]
  let modifiedBlog = null
  if (!Object.hasOwn(blogToUpdate._doc, 'comments')) {
    modifiedBlog = { ...(blogToUpdate._doc), comments: [{ content: commentObject.comment, id: getRandomInteger() }] }
  } else {
    modifiedBlog = { ...(blogToUpdate._doc), comments: blogToUpdate._doc.comments.concat({ content: commentObject.comment, id: getRandomInteger() }) }
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, modifiedBlog, { new: true, runValidators: true, context: 'query' })

  response.json(updatedBlog)
})

module.exports = blogsRouter