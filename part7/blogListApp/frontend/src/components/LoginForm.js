import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logginUser } from '../reducers/login'
import { useDispatch } from 'react-redux'

import { Button, NewLoginForm, NewDiv, NewInput } from './styles'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = event => {
    event.preventDefault()
    dispatch(logginUser({ username, password }, navigate))
    setUsername('')
    setPassword('')
  }

  return (
    <NewDiv>
      <h2>Log in to aplication</h2>
      <NewLoginForm onSubmit={handleLogin}>
        <div>
          Username
          <NewInput
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <NewInput
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button top="7.5rem" id="login-button" type="submit">
          Login
        </Button>
      </NewLoginForm>
    </NewDiv>
  )
}
