import axios from "axios"
import { useEffect, useState } from "react"
import Countries from "./components/FilteredCountries"
import FindCountryForm from "./components/FindCountryForm"



function App() {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])

  // Set countries list
  useEffect(() => {
    const getAllCountries = async () => {
      const {data: countries} = await axios.get('https://restcountries.com/v3.1/all')
      setCountries(countries)
    }  
    getAllCountries()
  }, [])

  const filter = (e) => {
    setFilterCountries(countries.filter(country => country.name.common.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
  }

  return (
    <div className="App">
      <FindCountryForm filteredCountry={filter}/>
      <Countries filteredCountries={filterCountries} countries={countries}/>
    </div>
  )
}

export default App
