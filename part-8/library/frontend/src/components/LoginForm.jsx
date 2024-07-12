import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOG_IN } from "../queries"
import { useNavigate } from "react-router-dom"

const LoginForm = ({ setToken, setError }) => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOG_IN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      navigate('/')
    }
  }, [result.data, setToken, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    login({variables: {username, password}})
    setUsername('')
    setPassword('')
  }

  return <>
    <h2>log in</h2>
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label>username:</label>
        <input type="text" value={username} onInput={(e) => setUsername(e.target.value)}/>
      </div>
      <div>
        <label>password:</label>
        <input type="password" value={password} onInput={(e) => setPassword(e.target.value)}/>
      </div>
      <button type="submit">log in</button>
    </form>
  </>
}

export default LoginForm