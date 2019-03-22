import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({ country }) => {
    const [ weather, setWeather ] = useState({})
    const weatherAPI = `http://api.apixu.com/v1/current.json?key=99bca7a9f5354187ad073742192203&q=${country.capital}`

    useEffect(() => {
        axios
            .get(weatherAPI)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    console.log(weather.location);

    const mapLang = () => country.languages.map(a => <li key={ a.name }>{ a.name }</li>)
    const imgStyle = {
        height: '250px',
        width: 'auto'
    }

    return (
        <div>
            <h2>{ country.name }</h2>
            <ul>
                <li>Capital: { country.capital }</li>
                <li>Population: { country.population }</li>
            </ul>
            <h3>Languages</h3>
            <ul>
                { mapLang() }
            </ul>
            <img style={ imgStyle } alt={ ` ${country.name} flag ` }src={ country.flag } />

        </div>
    )
}

export default Country
