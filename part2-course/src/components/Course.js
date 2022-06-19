const SubHeader = ({name}) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  
  
  const StatisticLine = ({name, value}) =>{
    return (
        <h3>{name} {value}</h3>
    )
  }  
  
  const Content = ({parts}) => {
    console.log(parts)
    
    return (
      <div>
        {parts.map((part,id) => {
          return <Part key={part.id} part={part}/>
        })}
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return(
      <div>
      <SubHeader name={course.name}/>
      <Content parts={course.parts}/>
      <StatisticLine name="total number of exercises" value={course.parts.reduce((total,part)=>total+part.exercises,0)} />
      </div>
    )
  }

  export default Course