export default function Statistics({good, neutral, bad, all}) {
    return (
      <>
        <h3>Statistics</h3>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>All: {all}</p>
        <p>Average: {(good + 0 - bad) / all}</p>
        <p>Positive: {(good / all) * 100}%</p>
      </>
    )
  }