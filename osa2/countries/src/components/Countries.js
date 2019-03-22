import React from 'react'

const Countries = ({ countries, setFilter }) => {

    const handleCountry = (evt) => {
        setFilter(evt.target.value)
    }

    const countryList = countries.map(a => <li key={ a.alpha3Code }>{ a.name } <button onClick={ handleCountry } value={ a.name }>show</button></li>)

    return (
        <ul>
            { countryList }
        </ul>
    )
}

export default Countries
