const express = require('express')
const app = express()
const appRouter = require('./app')
const data = require('./db')
const morgan = require('morgan')
const cors = require('cors')

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

app.get('/info', (request, response) => {
  response.send(`
  <h4>Phonebook has info for ${data.length} people</h4>
  ${new Date()}
  `)
})

app.use('/api/persons', appRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
