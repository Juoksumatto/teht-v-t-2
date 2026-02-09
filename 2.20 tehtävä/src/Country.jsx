import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const capital = country.capital[0]

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then(response => {
        setWeather(response.data)
      })
  }, [capital, apiKey])

  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>capital {capital}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang =>
          <li key={lang}>{lang}</li>
        )}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />

      {weather && (
        <>
          <h3>Weather in {capital}</h3>
          <div>temperature {weather.main.temp} °C</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <div>wind {weather.wind.speed} m/s</div>
        </>
      )}
    </div>
  )
}
console.log('API KEY:', import.meta.env.VITE_WEATHER_API_KEY)


export default Country
