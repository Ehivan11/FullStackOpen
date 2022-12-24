import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import { addPerson, getPersons, deletePerson, updatePerson } from './components/ServerConecctions'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '', id: null})
  const [filteredPerson, setFilterPerson] = useState('')  
  const [noti, setNoti] = useState(null)

  useEffect(() => {
    const getAllPersons = async () => {
      await getPersons()
      .then(res => {
        setPersons(res)
      })
    }
    getAllPersons()
  }, [])

  const clearNewPerson = () => {
    setNewPerson({ name: '', number: '' })
  }

  const nameValue = (e) => {
    setNewPerson(curr => {
      return {
        name: e.target.value,
        number: curr.number,
        id: Math.max(...persons.map(p => p.id)) + 1
      }
    })
  }

  const numberValue = (e) => {
    setNewPerson((curr) => ({
      name: curr.name,
      number: e.target.value,
      id: curr.id
    }))
  }

  const filter = (e) => {
    setFilterPerson(persons.filter(person => person.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
  }

  const pushNewName = async(event) => {
    event.preventDefault()
    
    if (persons.some(persons => persons.name === newPerson.name)) {
      const {id} = persons.find(person => person.name === newPerson.name)
      return updatePerson(id, setPersons, newPerson, setNoti)
    }

    addPerson(setPersons, newPerson, setNoti)
    clearNewPerson()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={noti}/>
      <Filter filterPerson={filter} />
      <h2>Add a new</h2>
      <PersonForm newPerson={newPerson} nameValue={nameValue} numberValue={numberValue} pushNewName={pushNewName} />
      <h2>Numbers</h2>
      <Persons filteredPerson={filteredPerson} persons={persons} deletePerson={deletePerson} setPersons={setPersons} setNoti={setNoti}/>
    </div>
  )
}

export default App