import { useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_AUTHOR } from "../queries"

const AuthorBirthYearForm = ({ authors, setNotification }) => {
  const [ name, setName ] = useState(authors[0].name)
  const [ birthYear, setBirthYear] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      setNotification({ content: error.graphQLErrors[0].message, outcome: "failure" })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    editAuthor({ variables: {name, setBornTo: Number(birthYear)}})

    setBirthYear('')
  }

  return <>
    <h3>Set Year of Birth</h3>
    <form onSubmit={handleSubmit}>
      <p>name: 
        <select value={name} onChange={e => setName(e.target.value)}>
          {authors.map(author => <option value={author.name} key={author.name}>{author.name}</option>)}
        </select>
      </p>
      <p>born:<input type="number" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} /></p>
      <button type="submit">update author</button>
    </form>
  </>
}

export default AuthorBirthYearForm