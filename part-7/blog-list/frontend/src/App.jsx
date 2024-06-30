import { useEffect } from "react"
import OutcomeMessage from "./components/OutcomeMessage"
import BlogList from "./components/BlogList"
import BlogForm from "./components/BlogForm"
import LogInForm from "./components/LogInForm"
import Toggleable from "./components/Toggleable"

import { createNotification } from "./reducers/notificationReducer"
import { initialiseBlogs, clearBlogs } from "./reducers/blogReducer"
import { initialiseUser, logOut as logOutAction } from "./reducers/userReducer"
import { useDispatch, useSelector } from "react-redux"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseUser())
  }, [dispatch])

  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      dispatch(initialiseBlogs())
    } else {
      dispatch(clearBlogs())
    }
  }, [dispatch, user])

  const logOut = () => {
    dispatch(logOutAction()).then(() => {
      dispatch(createNotification(["success", "logged out successfully"], 5))
    })
  }

  const displayMain = () => {
    if (user === null) {
      return (
        <>
          <h2>log in to the application</h2>
          <LogInForm />
        </>
      )
    } else {
      return (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in{" "}
            <button onClick={() => logOut()}>Log Out</button>
          </p>
          <Toggleable label={"add new blog"}>
            <BlogForm />
          </Toggleable>
          <BlogList />
        </>
      )
    }
  }

  return (
    <div>
      <OutcomeMessage />
      {displayMain()}
    </div>
  )
}

export default App
