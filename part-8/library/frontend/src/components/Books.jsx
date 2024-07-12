import { GET_ALL_BOOKS, GET_ALL_GENRES, GET_BOOKS_BY_GENRE } from "../queries"
import { useQuery } from "@apollo/client"
import { useState } from "react"

const Books = () => {
  const [currentGenre, setCurrentGenre] = useState(null)

  const allBooksQuery = useQuery(GET_ALL_BOOKS, {
    skip: currentGenre
  })
  const booksByGenreQuery = useQuery(GET_BOOKS_BY_GENRE, {
    skip: !currentGenre,
    variables: {
      genre: currentGenre
    }
  })

  const genresQuery = useQuery(GET_ALL_GENRES)

  const booksQuery = currentGenre ? booksByGenreQuery : allBooksQuery
    
  if (booksQuery.loading || genresQuery.loading) return <p>loading...</p>

  const books = booksQuery.data.allBooks
  const genreObjectArray = genresQuery.data.allBooks

  let genres = []
  for (const genreObject of genreObjectArray) {
    for (const genre of genreObject.genres) {
      if (!genres.includes(genre)) {
        genres = genres.concat(genre)
      }
    }
  }

  return (
    <div>
      <h2>books</h2>

      {currentGenre ? <div>in genre <strong>{currentGenre}</strong></div> : null}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        {genres.map(genre => 
          <button 
            key={genre} 
            onClick={() => setCurrentGenre(genre)}
          >
            {genre}
          </button>)}
        <button key={'all'} onClick={() => setCurrentGenre(null)}>all</button>
      </div>
    </div>
  )
}

export default Books
