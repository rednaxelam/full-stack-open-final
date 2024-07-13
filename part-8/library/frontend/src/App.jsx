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
import { BOOK_ADDED } from "./queries"

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

  const setError = (content) => {
    setNotificationObject({content, outcome: 'failure'})
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
    onData: ({ data }) =>  {
      window.alert('new book added')
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
        <Route path="/" element={<Authors setError={setError} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook />} />
        <Route path="/login-form" element={<LoginForm setError={setError} setToken={setToken} />} />
        <Route path="/recommended" element={<Recommended />} />
      </Routes>
    </>
  )
}

export default App;
