import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Recommended from "./components/Recommended"
import { Routes, Route, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useApolloClient, useSubscription } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { BOOK_ADDED, GET_ALL_BOOKS } from "./queries"
import { updateCache } from "./utils"

const LoggedInNavElements = ({logout, style}) => {
  return <>
    <Link style={style} to="/add-book">add book</Link>
    <Link style={style} to="/recommended">recommended</Link>
    <button style={style} onClick={() => logout()}>log out</button>
  </>
}

const LoggedOutNavElements = ({style}) => {
  return <Link style={style} to="/login-form">log in</Link>
}

const App = () => {
  const [notificationObject, setNotificationObject] = useState({})
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const navigate = useNavigate()

  const padding = {
    padding: 5
  }

  const setNotification = ({ content, outcome }) => {
    setNotificationObject({ content, outcome })
    setTimeout(() => setNotificationObject({}), 5000)
  }

  const logout = () => {
    navigate('/')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      setNotification({ content: `book "${addedBook.title}" has been added`, outcome: "success"})
      updateCache(client.cache, { query: GET_ALL_BOOKS }, addedBook)
    }
  })

  return (
    <>
      <Notification notificationObject={notificationObject} />

      <nav>
        <Link style={padding} to="/">authors</Link>
        <Link style={padding} to="/books">books</Link>
        {token ? <LoggedInNavElements style={padding} logout={logout} /> : <LoggedOutNavElements style={padding} />} 
      </nav>

      <Routes>
        <Route path="/" element={<Authors setNotification={setNotification} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook />} />
        <Route path="/login-form" element={<LoginForm setNotification={setNotification} setToken={setToken} />} />
        <Route path="/recommended" element={<Recommended />} />
      </Routes>
    </>
  )
}

export default App;
