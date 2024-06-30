import { useState } from "react"
import { useDispatch } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import {
  likeBlog as likeBlogAction,
  deleteBlog as deleteBlogAction,
} from "../reducers/blogReducer"

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [showDetailed, setShowDetailed] = useState(false)

  const blogStyle = {
    paddingTop: "10px",
    paddingLeft: "2px",
    border: "solid",
    borderWidth: "1px",
    marginBottom: "5px",
  }

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
          dispatch(createNotification(["success", successMessage]))
        })
        .catch((error) =>
          dispatch(createNotification(["failure", error.message])),
        )
    }
  }

  if (showDetailed) {
    return (
      <div style={blogStyle} className="blog">
        <p>
          {blog.title} {blog.author}{" "}
          <button onClick={() => setShowDetailed(false)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes} <button onClick={() => likeBlog()}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {user.username === blog.user.username ? (
          <p>
            <button onClick={() => deleteBlog()}>remove</button>
          </p>
        ) : null}
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className="blog">
        <p>
          {blog.title} {blog.author}{" "}
          <button onClick={() => setShowDetailed(true)}>view</button>
        </p>
      </div>
    )
  }
}

export default Blog
