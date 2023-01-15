import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export default function AnecdoteList() {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdoteReducer, filterReducer }) => {
    const filteredList = [...anecdoteReducer].filter(anecdote => {
      const regexFilter = new RegExp(filterReducer.toLowerCase())
      return regexFilter.test(anecdote.content.toLowerCase())
    })
    return filteredList.sort((a, b) => b.votes - a.votes)
  })

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>Vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
