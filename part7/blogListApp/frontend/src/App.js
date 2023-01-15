import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import Notification from './components/Notification'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'

import { setAllUsers } from './reducers/user'
import { initializeBlogs } from './reducers/blog'
import { removeUser } from './reducers/login'
import { localStorageUser } from './reducers/login'
import {
  MenuSpan,
  Menu,
  LoginSpan,
  Content,
  NewHomeDiv
} from './components/styles'

const App = () => {
  const user = useSelector(({ loginReducer }) => loginReducer)
  const blogs = useSelector(({ blogReducer }) =>
    [...blogReducer].sort((a, b) => b.likes - a.likes)
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(localStorageUser())
    navigate('/')
  }, [])

  useEffect(() => {
    dispatch(setAllUsers())
  }, [])

  const handleLogout = () => {
    dispatch(removeUser())
  }

  return (
    <>
      {user ? (
        <div>
          <Notification />
          <h1
            style={{
              cursor: 'pointer',
              position: 'relative',
              left: '0',
              right: '0',
              margin: 'auto',
              zIndex: '10',
              color: '#fff'
            }}
            onClick={() => navigate('/')}
          >
            Blogs
          </h1>
          <Menu>
            <li>
              <MenuSpan to="/">Blogs</MenuSpan>
            </li>
            <li>
              <MenuSpan to="/users">Users</MenuSpan>
            </li>
            <LoginSpan>
              <li>
                <span>{user.username}</span>
              </li>
              <li>
                <MenuSpan onClick={handleLogout}>Logout</MenuSpan>
              </li>
            </LoginSpan>
          </Menu>
        </div>
      ) : null}

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Content>
                <NewHomeDiv>
                  <BlogForm />
                </NewHomeDiv>
                <NewHomeDiv>
                  {blogs.map(blog => (
                    <Blog key={blog.id} blog={blog} user={user} />
                  ))}
                </NewHomeDiv>
              </Content>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users/:id"
          element={user ? <UserDetails /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/blogs/:id"
          element={user ? <BlogDetails /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </>
  )
}

export default App
