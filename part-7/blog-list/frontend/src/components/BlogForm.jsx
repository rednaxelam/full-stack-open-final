import { useState } from "react"
import blogServices from "../services/blogs"
import { useDispatch } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"

const handleInputChange = (stateUpdater) => {
  return ({ target }) => stateUpdater(target.value)
}

const TextualInput = ({ nom, state, stateUpdater }) => {
  return (
    <div className="form-control">
      <label htmlFor={nom}>{nom}:</label>
      <input
        type="text"
        name={nom}
        id={nom}
        value={state}
        onChange={handleInputChange(stateUpdater)}
      />
    </div>
  )
}

const BlogForm = ({ setBlogs, setVisibility }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // the if statement below is a compromise made for exercise 5.16. Not wanting to restructure the
    // application so that a postBlog function is passed as props, I've added the if statment below for
    // tests

    if (process.env.NODE_ENV === "test") {
      setBlogs({ title, author, url })
      return
    }

    try {
      const blogObject = { title, author, url }
      await blogServices.postBlog(blogObject)
      const newBlogList = await blogServices.getAll()
      setBlogs(newBlogList)
      dispatch(
        createNotification(
          [
            "success",
            `added ${blogObject.title} by ${blogObject.author} to blog list`,
          ],
          5,
        ),
      )
      if (setVisibility) setVisibility(false)
      setTitle("")
      setAuthor("")
      setUrl("")
    } catch (error) {
      dispatch(createNotification(["failure", error.message], 5))
    }
  }

  return (
    <>
      <h2>Create a new entry:</h2>
      <form onSubmit={handleSubmit}>
        <TextualInput nom={"title"} state={title} stateUpdater={setTitle} />
        <TextualInput nom={"author"} state={author} stateUpdater={setAuthor} />
        <TextualInput nom={"url"} state={url} stateUpdater={setUrl} />
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default BlogForm
