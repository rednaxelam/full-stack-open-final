import userService from "../services/users"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  
  & h3 {
    font-size: 1.5rem;
    margin: 0;
  }

  & h2 {
    font-size: 1.8rem;
    margin: 0 0 10px 0;
  }

  & ul, & li, & p {
    margin: 0;
    padding: 0;
  }

  & p {
    margin: 0 0 10px 5px;
  }
`

const User = () => {
  const id = useParams().id
  const [user, setUser] = useState(null)

  useEffect(() => {
    userService.getUserById(id).then((user) => setUser(user))
    return function cleanup() {
      setUser(null)
    }
  }, [id])

  if (!user) return null

  return (
    <StyleWrapper>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <p key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </p>
        ))}
      </ul>
    </StyleWrapper>
  )
}

export default User
