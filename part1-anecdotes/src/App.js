import { useState } from 'react'

const Button = ({name,clickHandler}) => {
  return (<button onClick={clickHandler}>{name}</button>)
}


const Anecdote = ({anecdotes,selected}) => {
  return <p>{anecdotes[selected]}</p>
}

const VoteCount = ({label, votecount}) => {
  return <p>{label} {votecount}</p>
}

const Heading = ({title}) => (<h1>{title}</h1>)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * (anecdotes.length)))
  const [votecount, setVotecount] = useState(new Uint8Array(anecdotes.length))
  const [maxIndex, setMaxIndex] = useState(0)


  const generateNewAnecdote = () => {
    const newSelected = Math.floor(Math.random() * (anecdotes.length))
    setSelected(newSelected)
  }

  const handleVotecount = () => {
    const newVoteCount = {...votecount}
    newVoteCount[selected] = votecount[selected]+1
    
    const newMaxIndex = newVoteCount[selected] > newVoteCount[maxIndex] ? selected : maxIndex

    console.log("new max index", newMaxIndex)
    setVotecount(newVoteCount)
    setMaxIndex(newMaxIndex)
  }

  return (
    <div>
      <Heading title="Anecdote of the day" />
      <Anecdote anecdotes={anecdotes} selected={selected}/>
      <VoteCount label="has votes " votecount={votecount[selected]}/>
      <Button name="Vote" clickHandler={handleVotecount}/>
      <Button name="Get Random Anecdote" clickHandler={generateNewAnecdote}/>
      <Heading title="Most Popular Anecdote" />
      <Anecdote anecdotes={anecdotes} selected={maxIndex}/>
    </div>
  )
}

export default App