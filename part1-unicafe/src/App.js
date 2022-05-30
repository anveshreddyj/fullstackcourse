import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const total = good+neutral+bad
  const average = (good*1+neutral*0+bad*(-1))/total
  const positive = 100*good/total

  if(good > 0 || neutral > 0 || bad > 0){
  return(
    
    <table>
      <tbody>
      <StatisticLine name="good" statisitic={good}/>
      <StatisticLine name="neutral" statisitic={neutral}/>
      <StatisticLine name="bad" statisitic={bad}/>
      <StatisticLine name="total" statisitic={total}/>
      <StatisticLine name="average" statisitic={average}/>
      <StatisticLine name="positive" statisitic={positive} format="%"/>
      </tbody>
    </table>
    
  )
  }
  else{
    return <p>no feedback given </p>
  }
}
const StatisticLine = ({name,statisitic,format}) => 
{return (
    <tr>
      <td>{name}</td>
      <td>{statisitic}{format}</td>
    </tr>)
    }
const Button =({name,clickhandler})=> (<button onClick={clickhandler}>{name}</button>)
const Title = ({title}) => (<h1>{title}</h1>)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodname="good"
  const neutralname="neutral"
  const badname="bad"
  
  const feedbacktitle = "submit feedback"
  const statstitle = "statistics"

  return (
    <div>
      <Title title={feedbacktitle}/>

      <Button name={goodname} clickhandler={()=>setGood(good+1)} />
      <Button name={neutralname} clickhandler={()=>setNeutral(neutral+1)} />
      <Button name={badname} clickhandler={()=>setBad(bad+1)} />

      <Title title={statstitle}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App