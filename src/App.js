import { useEffect, useState } from "react";
import "./style/style.css";
import "./style/reset.css";
import logo from "./images/logo2.png";

function App() {

  const [city, setCity] = useState({})
  const [cityInput, setCityInput] = useState('')

  async function getWeatherInfo(cityName) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=15f348269fa615760b2f05b9dc5a97d8`)
    const data = await response.json()
    console.log(data)
    return data
  }

  const loadWeather = async (cityName) =>{
    setCity(await getWeatherInfo(cityName))
    console.log(city)
  }

  const handleChange = (e)=>{
    setCityInput(e.target.value)
  }

  const changeCity = ()=>{
    console.log(cityInput)
    loadWeather(cityInput)
  }

  const ftoc = function(f) {
    let celsius = (f-32) * (5/9);
    celsius = Math.round(celsius * 10) / 10;
    return celsius;
  };
  //on click, true y ejecutar funcion ftoc sino dejar farenghet

  const ctof = function(c) {
    let f = c * (9/5) + 32;
    f = Math.round(f * 10) / 10;
    return f;
  };

  useEffect(() => {
    loadWeather('London')
  }, []);

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
          >
          °C / °F
        </button>
      </header>
      <section>
        <h1 className="city-title">{city.name}</h1>
        <ul>
          <li>Temperature: {city.main.temp}°</li>
          <li>Feels Like: {}°</li>
        </ul>
      </section>
      <section className="info-section">
      <ul>
          <div>
            <h3>SUNRISE</h3>
            <li>04:11</li>
          </div>
          <div>
            <h3>SUNSET</h3>
            <li>13:11</li>
          </div>
          <li>CHANCE OF RAIN </li>
          <li>HUMIDITY </li>
          <li>WIND </li>
          <li>FEELS LIKE </li>
          <li>PRECIPITATION </li>
          <li>PRESSURE </li>
          <li>VISIBILITY </li>
          <li>UV INDEX </li>
        </ul>
      </section>
    </div>
  );
}

export default App;
