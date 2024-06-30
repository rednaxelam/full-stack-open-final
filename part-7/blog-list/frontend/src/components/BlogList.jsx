import Blog from "./Blog"
import { useSelector } from "react-redux"

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  return (
    <div>
      {blogs
        .toSorted((blog1, blog2) => blog2.likes - blog1.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )
}

export default BlogList
