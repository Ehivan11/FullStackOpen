const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

router.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs', { user: 0 })

  response.json(users)
})

router.post('/', async (request, response, next) => {
  const { name, username, password } = await request.body

  const userExist = await User.find({ username })

  if (password === undefined || username === undefined) {
    return response.status(400).json({
      error: 'missing password or username'
    })
  }
  if (username.length < 3) {
    return response.status(400).json({
      error: 'username length must be greater than 3'
    })
  }
  if (userExist.length > 0) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  if (password.length < 3) {
    return response.status(400).json({
      error: 'password length must be greater than 3'
    })
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      name,
      username,
      passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})

// router.delete('/:id', async (request, response, next) => {
//   const { id } = request.params
//   try {
//     await Blog.findByIdAndDelete(id)
//     response.status(204).end()
//   } catch (err) {
//     next(err)
//   }
// })

// router.put('/:id', async (request, response, next) => {
//   const { likes } = request.body
//   const { id } = request.params
//   try {
//     await Blog.findByIdAndUpdate(
//       id,
//       { likes }
//     )
//     response.status(200).end()
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
