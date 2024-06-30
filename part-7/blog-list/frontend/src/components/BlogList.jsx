import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      {blogs
        .toSorted((blog1, blog2) => blog2.likes - blog1.likes)
        .map((blog) => (
          <p key={blog.id}>
            <Link to={`/blogs/${blog.id}`} >
              {blog.title}
            </Link>
          </p>
        ))}
    </div>
  )
}

export default BlogList
