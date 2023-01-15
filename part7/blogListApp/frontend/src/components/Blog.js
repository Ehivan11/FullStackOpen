import PropTypes from 'prop-types'
import { BlogTitle } from './styles'

const Blog = ({ blog }) => {
  return (
    <li style={{ listStyle: 'none' }}>
      <BlogTitle to={`/blogs/${blog.id}`}>{blog.title}</BlogTitle>
      <span
        style={{
          fontSize: 'small',
          display: 'block'
        }}
      >
        By {blog.author}
      </span>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
