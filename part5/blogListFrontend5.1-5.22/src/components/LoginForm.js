import { useState } from 'react'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import Notification from './Notification'

export default function LoginForm({ setUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [noti, setNoti] = useState(null)

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setNoti('loginError')
      setTimeout(() => setNoti(null), 3000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      {noti ? <Notification type={noti} /> : null}
      <div>
        Username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        Login
      </button>
    </form>
  )
}
