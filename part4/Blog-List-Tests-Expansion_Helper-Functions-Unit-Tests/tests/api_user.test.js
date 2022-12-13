const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  console.log('cleared')

  helper.initialUsers.forEach(async user => {
    const passwordHash = await bcrypt.hash(user.password, 10)

    const userObject = new User({
      name: user.name,
      username: user.username,
      passwordHash
    })

    await userObject.save()
    console.log('saved')
  })

  console.log('done')
})

test('Invalid users are not created and response with correct message', async () => {
  const newUser = {
    name: helper.newUser.name,
    username: helper.newUser.username
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()

  expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  expect(response.body.error).toBe('missing password or username')
})

afterAll(() => {
  mongoose.connection.close()
})
