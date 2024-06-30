import { useDispatch } from "react-redux"
import { logOut as logOutAction } from "../reducers/userReducer"
import { createNotification } from "../reducers/notificationReducer"

const Header = ({ user }) => {
  if (!user)
    throw new Error("Header should not be rendered if user is not logged in")

  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(logOutAction()).then(() => {
      dispatch(createNotification(["success", "logged out successfully"]))
    })
  }

  return (
    <>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={() => logOut()}>Log Out</button>
      </p>
    </>
  )
}

export default Header
