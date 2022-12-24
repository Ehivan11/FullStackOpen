import StatisticsLine from "./StatisticsLine"

export default function Statistics({good, neutral, bad, all}) {
  return (
    <>
      <h3>Statistics</h3>
      <StatisticsLine text={'Good'} value={good}/>
      <StatisticsLine text={'Neutral'} value={neutral} />
      <StatisticsLine text={'Bad'} value={bad} />
      <StatisticsLine text={'All'} value={all} />
      <StatisticsLine text={'Average'} value={(good + 0 - bad) / all} />
      <StatisticsLine text={'Positive'} value={(good / all) * 100 + '%'} />
    </>
  )
}
