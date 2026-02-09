import { useState, useEffect } from 'react'
import countryService from './services/service'
import Country from './Country'
import Filter from './Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService.getAll().then(response => {
      setCountries(response.data)
    })
  }, [])

  const showCountry = (name) => {
    setFilter(name)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange}
      />

      {filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}

      {filteredCountries.length > 1 &&
       filteredCountries.length <= 10 &&
       filteredCountries.map(country =>
        <div key={country.name.common}>
          {country.name.common} {' '}
          <button onClick={() => showCountry(country.name.common)}>
            show
          </button>
          </div>
     )
    }

      {filteredCountries.length === 1 &&
        <Country country={filteredCountries[0]} />
    }
    </div>
)

}
export default App
