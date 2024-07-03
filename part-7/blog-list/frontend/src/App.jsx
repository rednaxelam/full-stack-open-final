import { useEffect } from "react"
import OutcomeMessage from "./components/OutcomeMessage"
import LogInForm from "./components/LogInForm"
import Header from "./components/Header"
import Home from "./components/Home"
import Users from "./components/Users"
import User from "./components/User"
import BlogView from "./components/BlogView"

import { initialiseBlogs, clearBlogs } from "./reducers/blogReducer"
import { initialiseUser } from "./reducers/userReducer"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"

import styled from "styled-components"

const AppContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: max-content;
  min-width: 25vw;
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1.2rem;

  & button {
    font-size: 1rem;
    border-radius: 0.5rem;
    padding: 5px 10px;
    border: 1px black solid;
  }

  & input {
    font-size: 1rem;
  }
`

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
      <AppContainer >
        <OutcomeMessage />
        <h2>log in to the application</h2>
        <LogInForm />
      </AppContainer >
    )
  } else {
    return (
      <AppContainer >
        <OutcomeMessage />
        <Header user={user} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </AppContainer >
    )
  }


}

export default App
