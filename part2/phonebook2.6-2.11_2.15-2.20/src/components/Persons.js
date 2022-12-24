import PersonsList from './PersonsList'

export default function Persons({ filteredPerson, persons, deletePerson, setPersons, setNoti }) {
  return (
    <div>
      {filteredPerson.length === 0 ? (
        <PersonsList persons={persons} deletePerson={deletePerson} setPersons={setPersons} setNoti={setNoti}/>
      ) : (
        <PersonsList persons={filteredPerson} deletePerson={deletePerson} setPersons={setPersons} setNoti={setNoti}/>
      )}
    </div>
  )
} 
