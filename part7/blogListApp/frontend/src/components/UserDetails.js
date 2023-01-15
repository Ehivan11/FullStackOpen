import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { NewDiv } from './styles'

const UserDetails = () => {
  const userId = useParams().id

  const user = useSelector(({ userReducer }) =>
    [...userReducer].find(user => user.id === userId)
  )

  if (!user) {
    return null
  }

  return (
    <NewDiv>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </NewDiv>
  )
}

export default UserDetails
