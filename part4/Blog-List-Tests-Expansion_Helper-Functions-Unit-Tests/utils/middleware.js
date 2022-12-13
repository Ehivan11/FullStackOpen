const logger = require('./logger')
const helper = require('./middleware_helper')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  const token = helper.getTokenFrom(request)
  request.token = token
  next()
}

const userExtractor = async (request, response, next) => {
  // code that extracts the user
  try {
    if (request.method === 'GET' || request.method === 'PUT') {
      return next()
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
  } catch (err) {
    next(err)
  }
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid or expired token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'invalid or expired token'
    })
  }

  logger.error(error.message)

  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler
}
