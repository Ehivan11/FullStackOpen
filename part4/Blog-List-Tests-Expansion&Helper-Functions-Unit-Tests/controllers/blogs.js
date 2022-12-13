const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })

  response.json(blogs)
})

router.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  try {
    // Error handler should manage the below line if it's necessary
    const user = request.user

    const blog = new Blog({
      title,
      author,
      user: user._id,
      url,
      likes: likes || 0
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (request, response, next) => {
  const { id } = request.params

  const blog = await Blog.findById(id)

  try {
    const user = request.user

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(id)
      return response.status(204).end()
    }
    response.status(401).json({
      error: 'unauthorized'
    })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (request, response, next) => {
  const { likes } = request.body
  const { id } = request.params
  try {
    await Blog.findByIdAndUpdate(id, { likes })
    response.status(200).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
