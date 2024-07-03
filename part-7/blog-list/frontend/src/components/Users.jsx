import { useQuery } from "@tanstack/react-query"
import userService from "../services/users"
import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledTable = styled.table`
  min-width: 30vw;

  & tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  & th {
    padding: 1rem;
    text-align: left;
    background-color:  #007AFF;
    color: white;
  }

  & td {
    padding: 0.5rem;
  }
}
`

const Users = () => {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
  })

  if (users.isLoading) {
    return <div>loading data...</div>
  }

  if (users.isError) {
    return <div>Error: {users.error.message}</div>
  }

  return (
    <>
      <StyledTable>
        <tbody>
          <tr>
            <th>Users</th>
            <th>Blogs Created</th>
          </tr>
          {users.data.map((user) =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </>
  )
}

export default Users
