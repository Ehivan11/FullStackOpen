import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { NewDiv } from './styles'

const Users = () => {
  const usersList = useSelector(({ userReducer }) =>
    [...userReducer].sort((a, b) => b.blogs.length - a.blogs.length)
  )

  return (
    <NewDiv>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>Blogs created</th>
          </tr>
          {usersList.map(user => (
            <tr key={user.id}>
              <Link
                style={{
                  cursor: 'pointer',
                  color: '#141414',
                  textDecoration: 'none'
                }}
                to={`/users/${user.id}`}
              >
                {user.name}
              </Link>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </NewDiv>
  )
}

export default Users
