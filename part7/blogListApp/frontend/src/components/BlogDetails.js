import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { voteBlog, removeBlog, addComment } from '../reducers/blog'

import { NewDiv, NewInput, CommentForm, Button, NewUl } from './styles'

const BlogDetails = () => {
  const blogId = useParams().id
  const dispatch = useDispatch()
  const [like, setLike] = useState(true)
  const [comment, setComment] = useState('')

  const user = useSelector(({ loginReducer }) => loginReducer)

  const blog = useSelector(({ blogReducer }) =>
    [...blogReducer].find(blog => blog.id === blogId)
  )

  const handleLikes = async ({ target }) => {
    setLike(like => !like)
    if (like) {
      target.style.fill = like ? '#c60f0f' : '#fff'
      dispatch(voteBlog(blog, 'addition'))
    } else {
      target.style.fill = like ? '#c60f0f' : '#fff'
      dispatch(voteBlog(blog, 'subtraction'))
    }
  }

  const handleCommentChange = ({ target }) => {
    setComment(target.value)
  }

  const handleCommentSubmit = async event => {
    event.preventDefault()
    dispatch(addComment(comment, blog))
    setComment('')
  }

  const handleDelete = async () => {
    const accept = window.confirm(`Are you sure deleting '${blog.title}' blog`)

    if (accept) {
      dispatch(removeBlog(blog))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <>
      <NewDiv>
        <h3>{blog.title}</h3>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <span>{blog.likes} likes</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon-heart"
          viewBox="0 0 24 24"
          onClick={handleLikes}
          fill="#fff"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>
        {user.username === blog.user.username ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon-trash"
            viewBox="0 0 24 24"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={handleDelete}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        ) : null}
        <CommentForm onSubmit={handleCommentSubmit}>
          Comments
          <NewInput
            name="comment"
            id="comment"
            type="text"
            value={comment}
            placeholder="Add a comment"
            onChange={handleCommentChange}
          />
          <Button top="4rem" type="submit">
            Add comment
          </Button>
        </CommentForm>
      </NewDiv>
      <NewUl>
        {blog.comments.map(commentObj => {
          return <li key={commentObj.id}>{commentObj.comment}</li>
        })}
      </NewUl>
    </>
  )
}

export default BlogDetails
