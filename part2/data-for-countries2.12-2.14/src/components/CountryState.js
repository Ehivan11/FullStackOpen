import { useState } from 'react'
import CountryInfo from './CountryInfo'

export default function CountryState({ country }) {
  const [countryState, setCountryState] = useState(false)

  const changeState = (e) => {
    e.preventDefault()
    setCountryState((countryState) => !countryState)
  }

  return (
    <>
      <table>
        <tbody>
          <tr key={country.name.common}>
            <td>{country.name.common}</td>
            <td>
              <form>
                <button
                  style={{
                    marginLeft: '5px',
                    backgroundColor: '#eee',
                    border: 'none',
                  }}
                  onClick={changeState}
                >
                  {countryState ? 'Close' : 'Show'}
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
      {countryState ? <CountryInfo filteredCountry={[country]} /> : null}
    </>
  )
}
