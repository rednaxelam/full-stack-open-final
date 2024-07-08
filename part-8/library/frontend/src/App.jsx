import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { Routes, Route, Link } from "react-router-dom"

const App = () => {
  const padding = {
    padding: 5
  }

  return (
    <>
      <nav>
        <Link style={padding} to="/">authors</Link>
        <Link style={padding} to="/books">books</Link>
        <Link style={padding} to="/add-book">add book</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook />} />
      </Routes>
    </>
  )
}

export default App;
