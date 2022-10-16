import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const nofitication = async (type, setNoti, newPerson, id) => {
  switch (type) {
    case 'addPerson':
      return await axios
        .post(baseUrl, {
          name: newPerson.name,
          number: newPerson.number,
          id: newPerson.id
        })
        .then(() => {
          setNoti({
            message: newPerson.name + ' added successfully',
            class: 'success',
          })
          setTimeout(() => setNoti(null), 3000)
        })
        .catch(e => {
          console.log(e)
          setNoti({
            message: 'Added ' + newPerson.name,
            class: 'error',
          })
          setTimeout(() => setNoti(null), 3000)
        })

    case 'deletePerson':
      return await axios
        .delete(`${baseUrl}/${id}`)
        .then(() => {
          setNoti({
            message: 'Person deleted successfully',
            class: 'success',
          })
          setTimeout(() => setNoti(null), 3000)
        })
        .catch(e => {
          console.log(e)
          setNoti({
            message: 'Person has not deleted successfully',
            class: 'error',
          })
          setTimeout(() => setNoti(null), 3000)
        })

    case 'updatePerson':
      return await axios
        .put(`${baseUrl}/${id}`, {
          name: newPerson.name,
          number: newPerson.number,
          id
        })
        .then(() => {
          setNoti({
            message: newPerson.name + ' updated successfully',
            class: 'success',
          })
          setTimeout(() => setNoti(null), 3000)
        })
        .catch(e => {
          console.log(e)
          setNoti({
            message: 'Information of ' + newPerson.name + ' has already been removed server',
            class: 'error',
          })
          setTimeout(() => setNoti(null), 3000)
        })

    default:
      return null
  }
}

const getPersons = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const addPerson = async (setPersons, newPerson, setNoti) => {
  setPersons(currPersons => [...currPersons, newPerson])
  nofitication('addPerson', setNoti, newPerson)
}

const deletePerson = async (id, setPersons, setNoti) => {
  const accept = window.confirm('Are you sure you want to delete this person?')
  if (accept) {
    setPersons((currPersons) =>
      [...currPersons].filter((person) => person.id !== id)
    )

    nofitication('deletePerson', setNoti , undefined, id)
  }
}

const updatePerson = async (id, setPersons, newPerson, setNoti) => {
  const accept = window.confirm(
    `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
  )

  if (accept) {
    setPersons((currPersons) => {
      const personIndex = currPersons.findIndex(
        (p) => p.name === newPerson.name
      )
      currPersons.splice(personIndex, 1, {
        name: newPerson.name,
        number: newPerson.number,
        id
      })
      return [...currPersons]
    })

    nofitication('updatePerson', setNoti, newPerson, id)
  }
}

export { getPersons, addPerson, deletePerson, updatePerson }
