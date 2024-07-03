import { useState } from "react"
import { useDispatch } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import { logIn } from "../reducers/userReducer"
import styled from "styled-components"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: max-content;
  align-items: end;
  row-gap: 5px;

  & label {
    padding-right: 5px;
  }
`

const LogInForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(logIn({ username, password }))
      .then(() => {
        dispatch(createNotification(["success", "Successfully logged in"]))
      })
      .catch(() =>
        dispatch(createNotification(["failure", "Login Unsuccessful"])),
      )

    setUsername("")
    setPassword("")
  }

  const handleInputChange = (stateUpdater) => {
    return ({ target }) => stateUpdater(target.value)
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="username">username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleInputChange(setUsername)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="pwd">password:</label>
        <input
          type="password"
          name="pwd"
          id="pwd"
          value={password}
          onChange={handleInputChange(setPassword)}
        />
      </div>
      <button type="submit">login</button>
    </StyledForm>
  )
}

export default LogInForm
