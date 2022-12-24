import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [showAll, setShowAll] = useState(true)
  // const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm setUser={setUser} />
      </div>
    )
  }

  return (
    <div id='blogList'>
      <h1>Blogs</h1>
      <span className="userSpan">
        {user.username} loggedIn <br />
        <button className='buttonLogout' onClick={handleLogout}>Logout</button>
      </span>

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs} update={blogService.update} remove={blogService.remove} />
      ))}
      <BlogForm setBlogs={setBlogs} create={blogService.create} />
    </div>
  )
}

export default App