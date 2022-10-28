const express = require('express')
const router = express.Router()
const data = require('./db')

router.get('/', (request, response, next) => {
  response.json(data)
  next()
})

router.get('/:id', (request, response, next) => {
  const { id } = request.params
  const person = data.find((person) => person.id == id)
  if (person) {
    return response.json(person)
  }
  next()
  response.status(404).json({ errors: { message: 'Invalid person' } })
})

router.post('/', (request, response, next) => {
  try {
    const {name, number} = request.body
    const newPerson = {
        id: Math.max(...data.map(person => person.id)) + 1,
        name,
        number
    }

    if (data.some(person => person.name === name)) {
        return response.status(409).json({ error: 'Name must be unique' })
    }

    data.push(newPerson)
    response.json({name, number})
    next()
  } catch (e) {
    response.status(404).json({ error: 'The name or number is missing' })
  }
})

router.delete('/:id', async (request, response) => {
  const { id } = request.params
  const personIdx = await data.findIndex((person) => person.id == id)
  console.log(personIdx)

  if (personIdx >= 0) {
    data.splice(personIdx, 1)
    return response.status(200).json({ message: 'Success' })
  }
  response.status(404).json({ errors: { message: 'Invalid person' } })
})

module.exports = router
