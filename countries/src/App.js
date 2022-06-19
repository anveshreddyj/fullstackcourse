import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const CountryLine = ({country, handleShow}) => {
  return(
  <div> 
    <li>{country.name.common}
    {/* spent quite bit of time figuring out how to assign a value to a button
    but eventually didnt need to. i could have just called a function directly*/}
    <button onClick={()=>handleShow(country)}>show </button></li> 
  </div>)
}
const Language = ({language}) => <li>{language}</li>
const Filter = ({value, onChange}) => <div>search country name: <input value={value} onChange={onChange} /></div>

const WeatherAPI = (country)=>{
  if(country==='')return
  const lat= country.capitalInfo.latlng[0]
  const lon= country.capitalInfo.latlng[1]
  return "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&exclude=hourly,daily&appid="+api_key
}

const WeatherIconURL = (weather)=>{
  if(weather==='')return
  const iconID= weather.weather[0].icon
  return "http://openweathermap.org/img/wn/"+iconID+"@2x.png"
}
const WeatherDetails = ({country,weather}) => {
  if(weather==='') return
  const iconID = weather.weather.icon
  return(
    <div>
    <h2>Weather in {country.name.common}</h2>
    <p> temperature: {weather.main.temp} </p>
    <img src={WeatherIconURL(weather)} />
    <p> wind_speed: {weather.wind.speed} </p>
    </div>
  )
}
const CountryDetails = ({country, weather}) => {
  if(country==='')return
  return(
    <div>
    <h2>{country.name.common}</h2>
    <p> capital: {country.capital[0]} </p>
    <p> area: {country.area} </p>
    <h2>languages</h2>
    <ul>
    {Object.values(country.languages).map((language,i) => <Language language={language} key={i}/>)}  
    </ul>
    <img src={country.flags['png']} />
    </div>
  )
}
const CountriesList = ({filteredEntries, onClick}) => {
  if(filteredEntries.length > 10) {
    return <p> Too many matching counntries...</p>
  }
  else{
    return(
      <ul>
      {filteredEntries.map((country,i) => <CountryLine country={country} key={i} handleShow={onClick}/>)}  
      </ul>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  /*const [countries, setCountries] = useState([
    { name: 'India', number: '040-123456', id: 1 },
    { name: 'Pakistan', number: '39-44-5323523', id: 2 },
    { name: 'Sri Lanka', number: '12-43-234345', id: 3 },
    { name: 'Nepal', number: '39-23-6423122', id: 4 }
  ])*/
  const [filterCountry, setFilterCountry] = useState('')
  const [selectedCountry, setSelectedCountry]  = useState('')
  const [weatherObject, setWeatherObject] = useState('')

  const HandleFiltering = (event) => {
    setFilterCountry(event.target.value)
    setSelectedCountry('')
  }  

  const HandleShow = (country) =>{
    setSelectedCountry(country)
    console.log('weather effect')
      axios
        .get(WeatherAPI(country))
        .then(response => {
          console.log('weather promise fulfilled')
          setWeatherObject(response.data)
        })
  }

  // used map instead of filter
  const filteredCountries = filterCountry.length>0? countries.filter((country)=>country.name.common.includes(filterCountry)):[]

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  
   // useEffect(() => {
   /*  if(selectedCountry!=''){
      console.log('weather effect')
      axios
        .get(WeatherAPI(selectedCountry))
        .then(response => {
          console.log('weather promise fulfilled')
          setWeatherObject(response.data)
        })
      }*/
   // }, [])
    //console.log('fetched', weatherObject, 'weather')
  
  return (
    <div>
      <h2>Country Search</h2>
      
      <Filter value={filterCountry} onChange={HandleFiltering}/>
      <h3>Countries</h3>
      <CountriesList filteredEntries={filteredCountries} onClick={HandleShow} />
     <CountryDetails country={selectedCountry} weather={weatherObject}/>
     <WeatherDetails country={selectedCountry} weather={weatherObject} />
    </div>
  )
}

export default App