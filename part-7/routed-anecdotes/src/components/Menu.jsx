import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <nav>
      <Link style={padding} to={'/'}>anecdotes</Link>
      <Link style={padding} to={'/create_new'}>create new</Link>
      <Link style={padding} to={'/about'}>about</Link>
    </nav>
  )
}

export default Menu