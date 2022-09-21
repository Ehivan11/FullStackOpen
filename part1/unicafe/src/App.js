import { useState } from 'react'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const All = good + neutral + bad

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <button onClick={() => setGood((good) => (good += 1))}>Good</button>
        <button onClick={() => setNeutral((neutral) => (neutral += 1))}>
          Neutral
        </button>
        <button onClick={() => setBad((bad) => (bad += 1))}>Bad</button>
      </div>
      {All > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} all={All} />
      ) : (
        <h4>No feedback given</h4>
      )}
    </div>
  )
}

export default App
