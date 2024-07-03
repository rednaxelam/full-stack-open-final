import { useState } from "react"
import { useDispatch } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"
import styled from "styled-components"

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: max-content;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: 10px;
  row-gap: 5px;

  & label {
    padding-right: 5px;
  }
`

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

const BlogForm = ({ setVisibility }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(createBlog({ title, author, url }))
      .then(() => {
        dispatch(
          createNotification(
            ["success", `added ${title} by ${author} to blog list`],
            5,
          ),
        )
        if (setVisibility) setVisibility(false)
        setTitle("")
        setAuthor("")
        setUrl("")
      })
      .catch((error) =>
        dispatch(createNotification(["failure", error.message])),
      )
  }

  return (
    <StyleWrapper>
      <h2>Create a new entry:</h2>
      <StyledForm onSubmit={handleSubmit}>
        <TextualInput nom={"title"} state={title} stateUpdater={setTitle} />
        <TextualInput nom={"author"} state={author} stateUpdater={setAuthor} />
        <TextualInput nom={"url"} state={url} stateUpdater={setUrl} />
        <button type="submit">Create</button>
      </StyledForm>
    </StyleWrapper>
  )
}

export default BlogForm
