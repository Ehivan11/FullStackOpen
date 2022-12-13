const express = require('express')
const router = express.Router()
const Person = require('./mongo')

router.get('/', (request, response, next) => {
  Person.find({})
    .then((personsList) => {
      response.json(personsList)
    })
    .catch((err) => next(err))
})

router.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        return response.json(person)
      }
    })
    .catch((err) => next(err))
})

router.post('/', (request, response, next) => {
  const { name, number } = request.body

  const newPerson = new Person({
    name,
    number
  })

  if (name.length < 3) {
    return next({ name: 'NameLength' })
  }

  if (Person.findOne({ name }) === name) {
    return next({ name: 'Name unique' })
  }

  if (number.length < 8) {
    return next({ name: 'NumberLength' })
  }

  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
      next()
    })
    .catch((err) => next(err))
})

router.put('/', async (request, response, next) => {
  const { name, number } = request.body
  Person.findOneAndUpdate({ name }, { number })
    .then(() => {
      response.status(204).end()
    })
    .catch((err) => next(err))
})

router.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  await Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((err) => next(err))
})

module.exports = router
