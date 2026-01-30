import { useState, useEffect } from 'react'
import Filter from './Filter'
import Person from './Person'
import Persons from './Persons'
import personService from './services/service'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }

  personService
    .remove(id)
    .then(() => {
      setPersons(prevPersons =>
        prevPersons.filter(p => p.id !== id)
      )
      setErrorMessage(`'${person.name}' removed successfully`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
}

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      person => person.name === newName
    )
        setErrorMessage(
          `'${newName}' has been added to phonebook`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        alert(`${newName} is already added to phonebook with the same number`)
        return
      }

      const confirmUpdate = window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
      )        

    if (confirmUpdate) {
      const updatedPerson = {
        ...existingPerson,
        number: newNumber
      }
        setErrorMessage(
          `'${newName}' number updated sucessfully`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

            personService
        .update(existingPerson.id, updatedPerson)
        .then(response => {
          setPersons(
            persons.map(p =>
              p.id !== existingPerson.id ? p : response.data
            )
          )
          setNewName('')
          setNewNumber('')
        })
    }
    return
  }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
    })
}

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />

      <Filter
        filter={filter}
        handleFilterChange={(e) => setFilter(e.target.value)}
      />

      <h2>Add a new</h2>
      <Person
        addPerson={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App
