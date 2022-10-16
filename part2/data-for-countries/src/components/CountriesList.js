import CountryState from './CountryState'

export default function CountriesList({ countriesList }) {
  return (
    <>
      {countriesList.map((country) => {
        return <CountryState key={country.name.common} country={country} />
      })}
    </>
  )
}
