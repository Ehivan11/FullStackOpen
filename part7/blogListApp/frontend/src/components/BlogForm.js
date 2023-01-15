import { useState, useRef } from 'react'

import { createBlog } from '../reducers/blog'

import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { Button, NewInput, NewForm } from './styles'

export default function BlogForm() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [likes, setLikes] = useState(0)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = async event => {
    event.preventDefault()
    dispatch(
      createBlog({
        title,
        author,
        url,
        likes,
        comments: []
      })
    )
    blogFormRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setURL('')
    setLikes(0)
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
    <Togglable
      firstButtonLabel="New blog"
      secondButtonLabel="Cancel"
      top="1em"
      ref={blogFormRef}
    >
      <NewForm onSubmit={addBlog}>
        Title
        <NewInput
          name="title"
          id="title"
          type="text"
          value={title}
          placeholder="Title"
          onChange={handleBlogChange}
        />
        Author
        <NewInput
          name="author"
          id="author"
          type="text"
          value={author}
          placeholder="Author"
          onChange={handleBlogChange}
        />
        URL
        <NewInput
          name="url"
          id="url"
          type="text"
          value={url}
          placeholder="URL"
          onChange={handleBlogChange}
        />
        Likes
        <NewInput
          name="likes"
          id="likes"
          type="number"
          value={likes}
          placeholder="Likes"
          onChange={handleBlogChange}
        />
        <Button top="14.5rem" left="-10rem" id="save-blog" type="submit">
          Save
        </Button>
      </NewForm>
    </Togglable>
  )
}
