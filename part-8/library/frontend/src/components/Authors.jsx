import { GET_ALL_AUTHORS } from "../queries"
import { useQuery } from "@apollo/client"
import AuthorBirthYearForm from "./AuthorBirthYearForm"

const Authors = ({ setError }) => {
  const authorsQuery = useQuery(GET_ALL_AUTHORS)
  
  if (authorsQuery.loading) return <p>loading data...</p>

  const authors = authorsQuery.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorBirthYearForm authors={ authors } setError={setError} />
    </div>
  )
}

export default Authors
