import { useEffect } from "react"
import OutcomeMessage from "./components/OutcomeMessage"
import LogInForm from "./components/LogInForm"
import Header from "./components/Header"
import Home from "./components/Home"
import Users from "./components/Users"

import { initialiseBlogs, clearBlogs } from "./reducers/blogReducer"
import { initialiseUser, logOut as logOutAction } from "./reducers/userReducer"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseUser())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user) {
      dispatch(initialiseBlogs())
    } else {
      dispatch(clearBlogs())
    }
  }, [dispatch, user])

  if (user === null) {
    return (
      <div>
        <OutcomeMessage />
        <h2>log in to the application</h2>
        <LogInForm />
      </div>
    )
  } else {
    return (
      <div>
        <OutcomeMessage />
        <Header user={user} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    )
  }


}

export default App
