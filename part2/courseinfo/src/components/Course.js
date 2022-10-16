const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Total of {sum} exercises</p>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => (
  <>
    {parts.map(part => {
        return (
            <Part part={part} key={part.id}/>
        )
    })}
  </>
)

export default function Course({ courses }) {
  
  return (
    <>
      {courses.map(course => {
        const total = course.parts.reduce((prev, curr) => prev + curr.exercises, 0)
        return (
            <div key={course.id}>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total sum={total} />
            </div>
        ) 
      })}
    </>
  )
}
