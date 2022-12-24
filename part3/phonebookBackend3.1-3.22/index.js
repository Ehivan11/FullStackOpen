const express = require('express')
const app = express()
const appRouter = require('./app')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./mongo')
const errorHandler = require('./middlewares')

require('dotenv').config()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', async (request, response) => {
  const count = await Person.estimatedDocumentCount({})
  response.send(`<h4>Phonebook has info for ${count} people</h4>${new Date()}`)
})

app.use('/api/persons', appRouter)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
