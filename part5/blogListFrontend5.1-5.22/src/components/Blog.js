import { useRef, useState } from 'react'
import Togglable from './Togglable'
import Notification from './Notification'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, user, update, remove }) => {
  const [like, setLike] = useState(true)
  const [noti, setNoti] = useState(null)

  const blogListRef = useRef()

  const handleLikes = async ({ target }) => {
    setLike(like => !like)
    try {
      if (like) {
        blog.likes = blog.likes + 1
        await update(blog.id, blog)
        target.style.color = like ? '#c60f0f' : '#fff'
        setNoti('updateSuccess')
        return setTimeout(() => setNoti(null), 3000)
      } else {
        blog.likes = blog.likes - 1
        await update(blog.id, blog)
        target.style.color = like ? '#c60f0f' : '#fff'
        setNoti('updateSuccess')
        return setTimeout(() => setNoti(null), 3000)
      }
    } catch (err) {
      setNoti('updateError')
      setTimeout(() => setNoti(null), 3000)
    }
  }

  const handleDelete = async () => {
    const accept = window.confirm(`Are you sure deleting '${blog.title}' blog`)

    try {
      if (accept) {
        await remove(blog.id)
        setNoti('deleteSuccess')
        setTimeout(() => {
          setNoti(null)
          return setBlogs(oldList =>
            oldList.filter(blogToDelete => blogToDelete.id !== blog.id)
          )
        }, 2000)
      }
    } catch (err) {
      setNoti('deleteError')
      setTimeout(() => setNoti(null), 3000)
    }
  }

  return (
    <>
      {noti ? <Notification type={noti} /> : null}
      <div className={'blogsList'}>
        <span className={'blogTitle'}>{blog.title}</span>
        <Togglable
          firstButtonLabel="View"
          secondButtonLabel="Hide"
          className="toggleButtonDetails"
          ref={blogListRef}
        >
          <span className={'blogAuthor'}>
            By {blog.author} <br />
            URL: {blog.url} <br />
            Likes: {blog.likes}
            <span className="icon-heart" onClick={handleLikes} />
            {user.username === blog.user.username ? (
              <span className="icon-bin2" onClick={handleDelete} />
            ) : null}
          </span>
        </Togglable>
      </div>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
