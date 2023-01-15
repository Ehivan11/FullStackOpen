import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { setNotification } from './notification'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    newVote(state, action) {
      const { id, likes } = action.payload
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes
      }
      return state.map(blog => (blog.id !== id ? blog : changedBlog))
    },
    newComment(state, action) {
      const { comment, id: commentId } = action.payload
      const { id: blogId } = action.payload.blog
      const blogToChange = state.find(b => b.id === blogId)
      const changedBlog = {
        ...blogToChange,
        comments: blogToChange.comments.concat({ comment, id: commentId })
      }
      return state.map(blog => (blog.id !== blogId ? blog : changedBlog))
    },
    appendBlogs(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    remove(state, action) {
      const id = action.payload
      return state.filter(blogToDelete => blogToDelete.id !== id)
    }
  }
})

export const { newVote, newComment, appendBlogs, setBlogs, remove } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogsService.create(blog)
      dispatch(appendBlogs(newBlog))
      dispatch(setNotification({ message: `'${blog.title}' blog created` }, 3))
    } catch (e) {
      dispatch(
        setNotification(
          {
            message: `creating '${blog.title || 'no name'}' blog error`,
            type: 'alert'
          },
          3
        )
      )
    }
  }
}

export const voteBlog = (blog, type) => {
  return async dispatch => {
    try {
      const votedBlog = {
        ...blog,
        likes: type === 'subtraction' ? blog.likes - 1 : blog.likes + 1
      }
      type === 'subtraction'
        ? dispatch(
          setNotification(
            { message: `You removed like in '${blog.title}'` },
            3
          )
        )
        : dispatch(setNotification({ message: `You like '${blog.title}'` }, 3))
      const voteResponse = await blogsService.update(votedBlog)
      dispatch(newVote(voteResponse))
    } catch (e) {
      dispatch(
        setNotification(
          { message: `Updating '${blog.title}' like error`, type: 'alert' },
          3
        )
      )
    }
  }
}

export const addComment = (comment, blog) => {
  return async dispatch => {
    try {
      dispatch(
        setNotification({ message: `You comment in '${blog.title}'` }, 3)
      )
      const commentResponse = await blogsService.comment(comment, blog.id)
      dispatch(newComment(commentResponse))
    } catch (e) {
      dispatch(
        setNotification(
          { message: `Commenting '${blog.title}' error`, type: 'alert' },
          3
        )
      )
    }
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    try {
      await blogsService.remove(blog.id)
      dispatch(remove(blog.id))
      dispatch(setNotification({ message: `You deleted '${blog.title}'` }, 3))
    } catch (e) {
      dispatch(
        setNotification(
          { message: `Removing '${blog.title}' error`, type: 'alert' },
          3
        )
      )
    }
  }
}

export default blogSlice.reducer
