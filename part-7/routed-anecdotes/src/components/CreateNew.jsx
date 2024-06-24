import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
  const navigate = useNavigate()

  const content = useField('content', 'text')
  const author = useField('author', 'text')
  const info = useField('info', 'text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
    props.setNotification(`new anecdote ${content.value} has been added`)
    setTimeout(() => props.setNotification(''), 5000)
  }

  const resetForm = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} reset={null} />
        </div>
        <div>
          author
          <input {...author} reset={null} />
        </div>
        <div>
          url for more info
          <input {...info} reset={null} />
        </div>
        <button type="submit">create</button>
        <button onClick={resetForm}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew