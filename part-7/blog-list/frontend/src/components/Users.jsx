import { useQuery } from "@tanstack/react-query"
import userService from "../services/users"

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
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.data.map((user) =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Users
