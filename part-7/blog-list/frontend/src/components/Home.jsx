import Toggleable from "./Toggleable"
import BlogForm from "./BlogForm"
import BlogList from "./BlogList"

const Home = () => {
  return (
    <>
      <Toggleable label={"add new blog"}>
        <BlogForm />
      </Toggleable>
      <BlogList />
    </>
  )
}

export default Home
