
export default function FindCountryForm ({filteredCountry}) {
    return (
        <form>
            Find countries <input type='text' onChange={filteredCountry} />
        </form>
    )
}