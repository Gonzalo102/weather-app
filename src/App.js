import { useEffect, useState } from "react";
import "./style/style.css";
import "./style/reset.css";
import logo from "./images/logo2.png";
import { kelvinToCelsius } from "./utilities";
import { kelvinToFahrenheit } from "./utilities";
import { timeConverter } from "./utilities";
import { windDegreeToText } from "./utilities";

function App() {

  const [city, setCity] = useState()
  const [cityInput, setCityInput] = useState('')
  const [celsius, setCelsius] = useState(true)

  async function getWeatherInfo(cityName) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=15f348269fa615760b2f05b9dc5a97d8`)
    const data = await response.json()
    return data
  }

  const loadWeather = async (cityName) =>{
    setCity(await getWeatherInfo(cityName))
  }

  console.log(city)

  const handleChange = (e)=>{
    setCityInput(e.target.value)
  }

  const changeCity = ()=>{
    console.log(cityInput)
    loadWeather(cityInput)
  }

  const changeUnit = ()=>{
    setCelsius(!celsius)
  }

  useEffect(() => {
    loadWeather('London')
  }, []);

  if (!city){
    return null
  }
  return (
    <div className="wrapper">
      <header className="header">
        <img className="logo" src={logo} alt="logo"/>
        <form className="city-input">
          <input 
            name="position"
            placeholder="Enter a City"
            type="text"
            defaultValue=''
            onChange={handleChange}
          />
          <button
          
          type = "button"
          onClick={()=>{changeCity();}}
          > Search </button>
        </form>
        <button
          id="celsius-button"
          onClick={()=>{changeUnit()}}
          >
          °C / °F
        </button>
      </header>
      <section className="main-info">
          <h1 className="city-title">{city.name}</h1>
          <h2>{city.weather[0].main} </h2>
          <h3>{celsius ? kelvinToCelsius(city.main.temp) : kelvinToFahrenheit(city.main.temp)} </h3>
          <div>
            <h4>H:{celsius ? kelvinToCelsius(city.main.temp_max) : kelvinToFahrenheit(city.main.temp_max)}</h4>
            <h4>L:{celsius ? kelvinToCelsius(city.main.temp_min) : kelvinToFahrenheit(city.main.temp_min)}</h4>
          </div>
      </section>
      <section className="info-section">
      <ul>
          <div>
            <h3>SUNRISE</h3>
            <li>{timeConverter(city.sys.sunrise)}</li>
          </div>
          <div>
            <h3>SUNSET</h3>
            <li>{timeConverter(city.sys.sunset)}</li>
          </div>
          <div>
            <h3>HUMIDITY</h3>
            <li>{city.main.humidity}%</li>
          </div>
          <div>
            <h3>WIND</h3>
            <li>{windDegreeToText(city.wind.deg)} {Math.round(city.wind.speed * 3.6)} km/h</li>
          </div>
          <div>
            <h3>FEELS LIKE</h3>
            <li>{celsius ? kelvinToCelsius(city.main.feels_like) : kelvinToFahrenheit(city.main.feels_like)}</li>
          </div>
          <div>
            <h3>PRESSURE</h3>
            <li>{city.main.pressure} hPa</li>
          </div>
          <div>
            <h3>VISIBILITY</h3>
            <li>{Math.round(city.visibility / 1000)} km</li>
          </div>

        </ul>
      </section>
    </div>
  );
}

export default App;
