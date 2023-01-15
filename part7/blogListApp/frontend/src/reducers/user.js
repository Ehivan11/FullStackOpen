import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setAll(state, action) {
      return action.payload
    }
  }
})

export const { setAll } = userSlice.actions

export const setAllUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(setAll(users))
  }
}

export default userSlice.reducer
