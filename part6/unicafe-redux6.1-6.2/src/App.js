import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    const counter = useSelector(state => state)

  const handleDispatch = e => {
    switch (e.target.name) {
      case 'good':
        return dispatch({
          type: 'GOOD'
        })
      case 'ok':
        return dispatch({
          type: 'OK'
        })
      case 'bad':
        return dispatch({
          type: 'BAD'
        })
      case 'reset':
        return dispatch({
          type: 'ZERO'
        })
      default: break
    }
  }

  return (
    <div>
      <button name="good" onClick={handleDispatch}>
        good
      </button>
      <button name="ok" onClick={handleDispatch}>
        ok
      </button>
      <button name="bad" onClick={handleDispatch}>
        bad
      </button>
      <button name="reset" onClick={handleDispatch}>
        reset stats
      </button>
      <div>good {counter.good}</div>
      <div>ok {counter.ok}</div>
      <div>bad {counter.bad}</div>
    </div>
  )
}

export default App

