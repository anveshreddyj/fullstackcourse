import { useState, useEffect } from 'react'
import personService from './services/PersonService.js'
import './index.css'

const Number = ({person,onDelete}) => {
  return(
  <li>{person.name} {person.number}
  <button onClick={()=>onDelete(person.id)}> delete </button>
  </li>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.messageClass}>
      {message.message}
    </div>
  )
}

const Filter = ({value, onChange}) => <div>filter name: <input value={value} onChange={onChange} /></div>

const PersonForm = ({onSubmit, newName, handleNewName, newNumber, handleNewNumber}) => {
  return(
  <form onSubmit={onSubmit}>  
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          phone number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({filteredEntries, onDelete}) => {
  return(
    <ul>
    {/* missed adding key here */}
    {filteredEntries.map((person) => <Number person={person} key={person.id} onDelete={onDelete}/>)}  
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  /*const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])*/
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState([])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFiltering = (event) => {
    setFilterName(event.target.value)
  }

  const handleDelete = (id) => {
    console.log("deleting",id)
   if (window.confirm("Do you really want to delete?")) {
    personService
    .deletePerson(id)
    .then(response => {
      setPersons(persons.filter(person=>person.id!=id))
    })
    .then(()=>{
      setErrorMessage({message:`Deleted ${id}`,messageClass:`success`})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    )
  }
}

  const addNumbers = (event) =>{
    event.preventDefault() //this was missed
    
    const index = persons.findIndex((person)=>person.name===newName)
    console.log(index)
    if(index != -1){
      if(window.confirm(`Name ${newName} already exists, do you want to update?`)){
        const id= persons[index].id 
        const newPerson = {...persons[index], number:newNumber}
        personService
        .updatePerson(id, newPerson)
        .then(response => {
          setPersons(persons.map(person=>person.id===id?newPerson:person))
        })
        .then(()=>{
          setErrorMessage({message:`Updated ${newName}'s phone number`,messageClass:`success`})
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
        )
        .catch(error=>{
//          console.log(`oh no, error`)
          setErrorMessage({message:`${newName} doesn't exist`,messageClass:`error`})
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person=>person.id!=id))
        })
      }
      return
    }

    const maxId= persons.reduce((previous, current)=>current.id>previous?current.id:previous,0)
    console.log(`maxi id is ${maxId}`)
    const newEntry = {
      name: newName,
      number: newNumber,
      id: maxId+1
    }
    
    personService
        .addPerson(newEntry)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response))
        })
        .then(()=>{
          setErrorMessage({message:`Added ${newName} to phone book`,messageClass:`success`})
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          // this is the way to access the error message
          //console.log(error.response.data.error)
          setErrorMessage({message:error.response.data.error,messageClass:`error`})
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    //setPersons(persons.concat(newEntry))  
  

  // used map instead of filter
  const filteredEntries = filterName.length>0? persons.filter((person)=>person.name===filterName):persons

  useEffect(() => {
    console.log('effect')
    personService
      .getPersons()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={filterName} onChange={handleFiltering}/>
     
      <h3>Add New Number</h3>

      <PersonForm onSubmit={addNumbers} newName={newName} handleNewName={handleNewName} 
    newNumber={newNumber} handleNewNumber={handleNewNumber}/>


      <h3>Numbers</h3>
      
      <Persons filteredEntries={filteredEntries} onDelete={handleDelete} />
    </div>
  )
}

export default App