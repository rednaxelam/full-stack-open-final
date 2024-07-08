import { useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_AUTHOR } from "../queries"

const AuthorBirthYearForm = () => {
  const [ name, setName ] = useState('')
  const [ birthYear, setBirthYear] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const handleSubmit = (e) => {
    e.preventDefault()

    editAuthor({ variables: {name, setBornTo: Number(birthYear)}})

    setName('')
    setBirthYear('')
  }

  return <>
    <h3>Set Year of Birth</h3>
    <form onSubmit={handleSubmit}>
      <p>name:<input type="text" value={name} onChange={(e) => setName(e.target.value)} /></p>
      <p>born:<input type="number" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} /></p>
      <button type="submit">update author</button>
    </form>
  </>
}

export default AuthorBirthYearForm