import { useDispatch } from "react-redux"
import { logOut as logOutAction } from "../reducers/userReducer"
import { createNotification } from "../reducers/notificationReducer"
import { Link } from "react-router-dom"

const Header = ({ user }) => {
  if (!user)
    throw new Error("Header should not be rendered if user is not logged in")

  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(logOutAction()).then(() => {
      dispatch(createNotification(["success", "logged out successfully"]))
    })
  }

  const padding = {
    padding: 5
  }

  return (
    <>
      <nav>
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
        <span style={padding}>{user.name} logged in <button onClick={() => logOut()}>Log Out</button></span>
      </nav>
      <h2>blogs</h2>
    </>
  )
}

export default Header
