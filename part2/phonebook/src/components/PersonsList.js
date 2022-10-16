export default function PersonsList({ persons, deletePerson, setPersons, setNoti }) {
  return (
    <>
      {persons.map((persons) => {
        return (
          <div key={persons.name}>
            {persons.name} {persons.number}
            <button style={{border: 'none', marginLeft: '5px'}} onClick={() => deletePerson(persons.id, setPersons, setNoti)}>Delete</button>
          </div>
        )
      })}
    </>
  )
}
