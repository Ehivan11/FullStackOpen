import { useState, useRef } from 'react'
import Notification from './Notification'
import Togglable from './Togglable'

// Maybe we should use the useReducer hook instead

export default function BlogForm({ setBlogs, create }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [likes, setLikes] = useState(0)
  const [noti, setNoti] = useState(null)

  const blogFormRef = useRef()

  const addBlog = async event => {
    event.preventDefault()
    try {
      const blogResponse = await create(
        {
          title,
          author,
          url,
          likes
        },
        setNoti
      )
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs => {
        const newList = blogs.concat(blogResponse)
        newList.sort((a, b) => b.likes - a.likes)
        return newList
      })
      setTitle('')
      setAuthor('')
      setURL('')
      setLikes(0)
      setNoti('blogSuccess')
      setTimeout(() => setNoti(null), 3000)
    } catch (err) {
      setNoti('blogError')
      setTimeout(() => setNoti(null), 3000)
    }
  }

  const handleBlogChange = event => {
    if (event.target.name === 'title') {
      setTitle(() => event.target.value)
    } else if (event.target.name === 'author') {
      setAuthor(() => event.target.value)
    } else if (event.target.name === 'url') {
      setURL(() => event.target.value)
    } else if (event.target.name === 'likes') {
      setLikes(() => (event.target.value < 0 ? 0 : event.target.value))
    }
  }

  return (
    <>
      {noti ? <Notification type={noti} /> : null}
      <Togglable
        firstButtonLabel="New blog"
        secondButtonLabel="Cancel"
        className="toggleButtonBlog"
        ref={blogFormRef}
      >
        <form onSubmit={addBlog} className={'blogForm'}>
          Title
          <input
            name="title"
            id="title"
            type="text"
            value={title}
            placeholder="Title"
            onChange={handleBlogChange}
          />
          Author
          <input
            name="author"
            id="author"
            type="text"
            value={author}
            placeholder="Author"
            onChange={handleBlogChange}
          />
          URL
          <input
            name="url"
            id="url"
            type="text"
            value={url}
            placeholder="URL"
            onChange={handleBlogChange}
          />
          Likes
          <input
            name="likes"
            id="likes"
            type="number"
            value={likes}
            placeholder="Likes"
            onChange={handleBlogChange}
          />
          <button id="save-blog" className="saveBlog" type="submit">
            Save
          </button>
        </form>
      </Togglable>
    </>
  )
}
