const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const initialUsers = [
  {
    name: 'Ehivan Ivankovich',
    username: 'Ehivan11',
    password: 'messicampeon'
  },
  {
    name: 'Lionel Messi',
    username: 'Messi10',
    password: 'ArafueHolanda'
  }
]

const newBlog = {
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 1
}

const newUser = {
  name: 'Neymar Junior',
  username: 'NeymarJR',
  password: 'LoSientoBrasil'
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(blog => blog.toJSON())
}

const getUserToken = async api => {
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const loginResponse = await api
    .post('/api/login')
    .send({
      username: newUser.username,
      password: newUser.password
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return loginResponse.body.token
}

module.exports = {
  initialBlogs,
  initialUsers,
  newBlog,
  newUser,
  nonExistingId,
  blogsInDb,
  usersInDb,
  getUserToken
}
