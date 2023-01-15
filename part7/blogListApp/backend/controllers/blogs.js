const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

router.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
    .populate('user', { blogs: 0 })
    .populate('comments', { blog: 0 })

  response.json(blogs)
})

router.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  const titleExist = await Blog.find({ title })

  if (titleExist.length > 0) {
    return response.status(400).json({
      error: 'Title must be unique'
    })
  }

  try {
    // Error handler should manage the below line if it's necessary
    const user = request.user

    const blog = new Blog({
      title,
      author,
      user: user._id,
      url,
      likes: likes || 0,
      comments: []
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    const blogToReturn = await Blog.findById(savedBlog._id)
      .populate('user', {
        username: 1,
        name: 1
      })
      .populate('comments', { blog: 0 })

    response.status(201).json(blogToReturn)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/comments', async (request, response, next) => {
  const { comment } = request.body
  const { id } = request.params

  try {
    const newComment = new Comment({
      comment,
      blog: id
    })

    const savedComment = await newComment.save()

    const blogToPushComment = await Blog.findById(id)
    blogToPushComment.comments = blogToPushComment.comments.concat(
      savedComment.id
    )

    await blogToPushComment.save()

    const commentToReturn = await Comment.findById(savedComment._id).populate(
      'blog',
      { comments: 0 }
    )

    response.status(201).json(commentToReturn)
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
      error: 'Unauthorized'
    })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (request, response, next) => {
  const { likes } = request.body
  const { id } = request.params

  try {
    const user = request.user

    if (User.exists({ id: user.id })) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { likes },
        { new: true, runValidators: true, context: 'query' }
      )
        .populate('user', { username: 1, name: 1 })
        .populate('comments', { blog: 0 })

      return response.json(updatedBlog)
    }
    response.status(401).json({
      error: 'Unauthorized'
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
