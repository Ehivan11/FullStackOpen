import axios from 'axios'
// const baseUrl = `https://restcountries.com/v3.1/name/{name}?fullText=true`

// const getAll = async () => {
//   const response = await axios.get(baseUrl)
//   return response.data
// }

const getCountry = async countryName => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    )
    return response.data[0]
  } catch (err) {
    return null
  }
}

export default { getCountry }
