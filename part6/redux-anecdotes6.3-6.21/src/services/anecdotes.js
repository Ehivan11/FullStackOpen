import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const object = { content, id: (await getAll().length) + 1, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const newVote = async anecdote => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, {
    content: anecdote.content,
    votes: anecdote.votes + 1
  })
  return response.data
}

export default { getAll, createNew, newVote }
