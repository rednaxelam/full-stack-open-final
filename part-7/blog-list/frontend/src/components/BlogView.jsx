import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { likeBlog as likeBlogAction, addComment } from "../reducers/blogReducer"
import { createNotification } from "../reducers/notificationReducer"
import { deleteBlog as deleteBlogAction } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"
import { useState } from "react"
import TextualInput from "./TextualInput"
import styled from "styled-components"

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  row-gap: 10px;
  
  & p {
    margin: 0;
  }

  & h3 {
    margin: 0;
  }
`

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 10px 0px;

  & form {
    margin: 0;
    align-self: center;
    display: flex;
    flex-direction: column;
    width: max-content;
    align-items: end;
    row-gap: 5px;

    & label {
      padding-right: 5px;
    }
  }

  & h4 {
    font-size:1.5rem;
    margin: 0;
  }
`

const BlogView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [comment, setComment] = useState("")

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
          navigate("/")
          dispatch(createNotification(["success", successMessage]))
        })
        .catch((error) =>
          dispatch(createNotification(["failure", error.message])),
        )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addComment(comment, blog.id))
      .then(() => {
        dispatch(createNotification(["success", "comment added"]))
      })
      .catch((error) => {
        dispatch(createNotification(["failure", error.message]))
      })
    setComment("")
  }

  if (!blog) return <p>no blog with given id found</p>
  else
    return (
      <StyleWrapper>
        <h3>{blog.title}</h3>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          {blog.likes} likes <button onClick={() => likeBlog()}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        <CommentsContainer>
          <h4>comments</h4>
          <ul>
            {blog.comments.map((commentObject) => (
              <li key={commentObject.id}>{commentObject.content}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <TextualInput
              nom={"comment"}
              state={comment}
              stateUpdater={setComment}
            />
            <button type="submit">add comment</button>
          </form>
        </CommentsContainer>
        {user.username === blog.user.username ? (
          <p>
            <button onClick={() => deleteBlog()}>remove</button>
          </p>
        ) : null}
      </StyleWrapper>
    )
}

export default BlogView
