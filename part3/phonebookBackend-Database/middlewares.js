const errorHandler = (error, request, response, next) => {
  console.error(error)
  switch (error.name) {
    case 'CastError':
      return response.status(400).send({ error: 'Malformatted' })
    case 'NameLength':
      return response
        .status(400)
        .send({ error: 'Name is shorter than the minimum allowed length (3)' })
    case 'NameUnique':
      return response.status(409).send({ error: 'Name must be unique' })
    case 'NumberLength':
      return response
        .status(409)
        .send({
          error: 'Number is shorter than the minimum allowed length (8   )'
        })
    default:
      return next(error)
  }
}

module.exports = errorHandler
