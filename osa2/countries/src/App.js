import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Country from './components/Country'
import Countries from './components/Countries'

const App = () => {
    const [ filter, setFilter ] = useState('')
    const [ countries, setCountries ] = useState([])

    const apiURL = 'https://restcountries.eu/rest/v2/all'

    useEffect(() => {
        axios
            .get(apiURL)
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    // filter results
    const filtered = (filter.length > 0) ? countries.filter(a => a.name.match(new RegExp(filter, 'gi'))) : countries

    // if too many results, tell the user
    // if one result, show that result
    // if less than ten results, show a list of results
    const returnResult = () => {
        if (filtered.length > 10) {
            return <p>too many results, try narrowing your search</p>
        } else if (filtered.length === 1) {
            return <Country country={ filtered[0] } />
        } else {
            return <Countries countries={ filtered } setFilter={ setFilter } />
        }
    }

    return (
        <div>
            <h2>country search</h2>
            <Filter setFilter={ setFilter } filter={ filter }/>
            { returnResult() }
        </div>
    )
}

export default App
