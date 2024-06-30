import { useState, useEffect } from "react"
import OutcomeMessage from "./components/OutcomeMessage"
import BlogList from "./components/BlogList"
import BlogForm from "./components/BlogForm"
import LogInForm from "./components/LogInForm"
import Toggleable from "./components/Toggleable"
import blogService from "./services/blogs"

import { createNotification } from "./reducers/notificationReducer"
import { initialiseBlogs, clearBlogs } from "./reducers/blogReducer"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = window.localStorage.getItem("loggedUser")
    if (savedUser) {
      const currentUser = JSON.parse(savedUser)
      setUser(currentUser)
      blogService.setToken(currentUser.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(initialiseBlogs())
      blogService.setToken(user.token)
    } else {
      dispatch(clearBlogs())
      blogService.removeToken()
    }
  }, [dispatch, user])

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem("loggedUser")
    dispatch(createNotification(["success", "logged out successfully"], 5))
  }

  const displayMain = () => {
    if (user === null) {
      return (
        <>
          <h2>log in to the application</h2>
          <LogInForm setUser={setUser} />
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
          <BlogList user={user} />
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
