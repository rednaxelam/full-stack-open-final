import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const initialState = []

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    append(state, action) {
      return state.concat(action.payload)
    },
    setAll(state, action) {
      return action.payload
    },
    update(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog,
      )
    },
    remove(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
  },
})

const { append, setAll, update, remove } = blogSlice.actions

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setAll(blogs))
  }
}

export const createBlog = (newBlogDetails) => {
  return async (dispatch) => {
    await blogService.postBlog(newBlogDetails)
    const newBlogList = await blogService.getAll()
    dispatch(setAll(newBlogList))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    await blogService.updateBlog(newBlog, blog.id)
    const newBlogList = await blogService.getAll()
    dispatch(setAll(newBlogList))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id)
    const newBlogList = await blogService.getAll()
    dispatch(setAll(newBlogList))
  }
}

export const clearBlogs = () => {
  return (dispatch) => {
    dispatch(setAll([]))
  }
}

export const addComment = (content, id) => {
  return async (dispatch) => {
    await blogService.postComment(content, id)
    const newBlogList = await blogService.getAll()
    dispatch(setAll(newBlogList))
  }
}

export default blogSlice.reducer
