import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notification'
import blogReducer from './reducers/blog'
import loginReducer from './reducers/login'
import userReducer from './reducers/user'

const store = configureStore({
  reducer: {
    loginReducer,
    blogReducer,
    notificationReducer,
    userReducer
  }
})

export default store
