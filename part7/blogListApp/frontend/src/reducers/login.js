import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notification'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      window.localStorage.removeItem('loggedBlogUser')
      return null
    }
  }
})

export const { setUser, removeUser } = loginSlice.actions

export const localStorageUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logginUser = (user, navigate) => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      dispatch(setUser(loggedUser))
      navigate('/')
    } catch (e) {
      dispatch(
        setNotification({ message: 'Wrong credentials', type: 'alert' }, 3)
      )
    }
  }
}

export default loginSlice.reducer
