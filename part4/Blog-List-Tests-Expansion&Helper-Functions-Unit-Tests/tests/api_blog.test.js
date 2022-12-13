const mongoose = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log('cleared')

  await helper.initialUsers.forEach(async user => {
    const passwordHash = await bcrypt.hash(user.password, 10)

    const userObject = new User({
      name: user.name,
      username: user.username,
      passwordHash
    })

    await userObject.save()
    console.log('user saved')
  })

  await helper.initialBlogs.forEach(async blog => {
    const blogObject = new Blog(blog)
    await blogObject.save()
    console.log('blog saved')
  })

  console.log('initial config done')
})

test('Blogs are returned as JSON and at the correct amount', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('The unique identifier property of the blog posts is named id', async () => {
  const token = await helper.getUserToken(api)

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.id).toBeDefined()
})

test('The total number of blogs in the system is increased by one in a successfully saved blog', async () => {
  const token = await helper.getUserToken(api)

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(helper.newBlog.title)
})

test('If there is no likes property on the request, it should be 0', async () => {
  const token = await helper.getUserToken(api)

  const newBlog = {
    title: helper.newBlog.title,
    author: helper.newBlog.author,
    url: helper.newBlog.url
  }

  const blogResponse = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(blogResponse.body.likes).toBe(0)
})

test('If there is no title or URL on the request, respond with a 400 status code', async () => {
  const token = await helper.getUserToken(api)

  const newBlog = {
    author: helper.newBlog.author,
    url: helper.newBlog.url,
    likes: helper.newBlog.likes
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('Deleting a single blog should remove 1 in the DB', async () => {
  // Before delete blog
  const token = await helper.getUserToken(api)

  const blogToDelete = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsBefore = await helper.blogsInDb()
  expect(blogsBefore).toHaveLength(helper.initialBlogs.length + 1)

  const titlesBefore = blogsBefore.map(b => b.title)
  expect(titlesBefore).toContain(helper.newBlog.title)

  // After delete blog

  await api
    .delete(`/api/blogs/${blogToDelete.body.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain(helper.newBlog.title)
})

test('Updating a single blog should change in the DB', async () => {
  const token = await helper.getUserToken(api)

  const blogToUpdate = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const propertyToUpdate = {
    likes: 4
  }

  await api
    .put(`/api/blogs/${blogToUpdate.body.id}`)
    .send(propertyToUpdate)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(blogToUpdate.body.title)
})

test.only('Status code 401 Unauthorized if a token is not provided', async () => {
  const blogResponse = await api
    .post('/api/blogs')
    .send(helper.newBlog)
    .expect(401)

  expect(blogResponse.res.statusMessage).toBe('Unauthorized')

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
