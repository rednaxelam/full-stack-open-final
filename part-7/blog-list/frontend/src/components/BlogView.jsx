import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { likeBlog as likeBlogAction } from "../reducers/blogReducer"
import { createNotification } from "../reducers/notificationReducer"
import { deleteBlog as deleteBlogAction } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"

const BlogView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  if (!blogs || blogs.length === 0 || !user) return null

  const blog = blogs.find((blog) => blog.id === id)

  const likeBlog = () => {
    dispatch(likeBlogAction(blog))
      .then(() => {
        dispatch(
          createNotification(["success", `${blog.title} has been liked`]),
        )
      })
      .catch((error) =>
        dispatch(createNotification(["failure", error.message])),
      )
  }

  const deleteBlog = () => {
    if (user.username !== blog.user.username) {
      dispatch(
        createNotification([
          "failure",
          "Unauthorized action: Only the creator of an entry may delete it",
        ]),
      )
      return
    }
    if (
      window.confirm(
        `Permanently delete entry for ${blog.title} by ${blog.author}?`,
      )
    ) {
      const successMessage = `entry for ${blog.title} has been successfully deleted`
      dispatch(deleteBlogAction(blog))
        .then(() => {
          navigate('/')
          dispatch(createNotification(["success", successMessage]))
        })
        .catch((error) =>
          dispatch(createNotification(["failure", error.message])),
        )
    }
  }

  if (!blog) return <p>no blog with given id found</p>
  else
    return (
      <>
        <h2>{blog.title}</h2>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          {blog.likes} likes{" "}
          <button onClick={() => likeBlog()}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        {user.username === blog.user.username ? (
          <p>
            <button onClick={() => deleteBlog()}>remove</button>
          </p>
        ) : null}
      </>
    )
}

export default BlogView
