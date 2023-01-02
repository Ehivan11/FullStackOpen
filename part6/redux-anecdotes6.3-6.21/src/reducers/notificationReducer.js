import { createSlice } from '@reduxjs/toolkit'

let timeoutID 

const notiSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    newNoti(state, action) {
      return state = action.payload || null
    },
    removeNoti(state, action) {

      return state = null
    }
  }
})

export const { newNoti, removeNoti } = notiSlice.actions

export const setNotification = (content, seconds = 5) => {
  return async dispatch => {
    dispatch(newNoti(content))
    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout(() => dispatch(removeNoti()), seconds * 1000)
  }
}

export default notiSlice.reducer
