import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

const renderTodo = () => {
  const todo = { text: 'wow! text!', done: false }
  const onClickDelete = jest.fn()
  const onClickComplete = jest.fn()

  render(
    <Todo todo={todo} onClickDelete={onClickDelete} onClickComplete={onClickComplete} />
  )
}

test('Todo component renders the title of the todo', () => {
  renderTodo()

  screen.getByText('wow! text!', { exact: false })
})