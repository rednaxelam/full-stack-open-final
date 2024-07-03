import { useDispatch } from "react-redux"
import { logOut as logOutAction } from "../reducers/userReducer"
import { createNotification } from "../reducers/notificationReducer"
import { Link } from "react-router-dom"
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 25px;
`

const StyledNav = styled.nav`
  display: flex;
  width: 100%;
  column-gap: 0.75rem;
`

const Header = ({ user }) => {
  if (!user)
    throw new Error("Header should not be rendered if user is not logged in")

  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(logOutAction()).then(() => {
      dispatch(createNotification(["success", "logged out successfully"]))
    })
  }

  const expandRight = {
    "flexGrow": "1"
  }

  return (
    <>
      <StyledNav>
        <Link to='/'>blogs</Link>
        <Link style={expandRight} to='/users'>users</Link>
        <span>{user.name} logged in <button onClick={() => logOut()}>Log Out</button></span>
      </StyledNav>
      <Title >The Blog List</Title >
    </>
  )
}

export default Header
