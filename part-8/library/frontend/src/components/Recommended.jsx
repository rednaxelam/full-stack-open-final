import { useQuery } from "@apollo/client"
import { GET_USER_FAVORITE_GENRE, GET_BOOKS_BY_GENRE } from "../queries"

const Recommended = () => {
  const userGenreQuery = useQuery(GET_USER_FAVORITE_GENRE)
  const recommendedBooksQuery = useQuery(GET_BOOKS_BY_GENRE, {
    skip: userGenreQuery.loading,
    variables: {
      genre: userGenreQuery.loading ? null : userGenreQuery.data.me.favoriteGenre 
    }
  })

  if (userGenreQuery.loading || recommendedBooksQuery.loading) return <p>loading...</p>
  
  const favoriteGenre = userGenreQuery.data.me.favoriteGenre
  const recommendedBooks = recommendedBooksQuery.data.allBooks

  return <>
    <h2>recommendations</h2>
    <div>books in your favorite genre <strong>{favoriteGenre}</strong></div>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {recommendedBooks.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
}

export default Recommended