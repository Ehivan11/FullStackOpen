import CountriesList from './CountriesList'
import CountryInfo from './CountryInfo'

export default function Countries({
  filteredCountries,
  countries
}) {
  return (
    <div>
      {filteredCountries.length === 0 ? (
        <CountriesList countriesList={countries} />
      ) : filteredCountries.length === 1 ? (
        <CountryInfo filteredCountry={filteredCountries} />
      ) : (
        <CountriesList countriesList={filteredCountries} />
      )}
    </div>
  )
}
