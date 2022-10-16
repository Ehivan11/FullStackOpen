import axios from 'axios'
import { useEffect, useState } from 'react'

const API_KEY = process.env.REACT_APP_API_KEY

export default function CountryInfo({ filteredCountry }) {
  const [weather, setWeather] = useState(undefined)

  const [coords] = filteredCountry.map(({ latlng }) => ({
    lat: latlng[0],
    lng: latlng[1],
  }))

  // Set weather
  useEffect(() => {
    const getWeather = async () => {
      const { data: weather } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${API_KEY}`
      )
      setWeather(weather)
    }
    getWeather()
  }, [coords.lat, coords.lng])

  return (
    <>
      {filteredCountry.map((country) => {
        return (
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <h4>Languages</h4>
            <ul>
              {Object.values(country.languages).map((language) => {
                return <li key={language}>{language}</li>
              })}
            </ul>
            <img
              style={{ width: '250px' }}
              src={country.flags.png}
              alt={country.name.common + ' flag'}
            />
            <h4>Weather in {country.capital[0]}</h4>
            {weather ? (
              <div>
                <p>Temperature {weather.main.temp} Celcius</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={country.name.common + ' weather icon'}
                />
                <p>Wind {weather.wind.speed} m/s</p>
              </div>
            ) : null}
          </div>
        )
      })}
    </>
  )
}
