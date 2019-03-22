import React from 'react'

const Weather = ({ weather }) => {

    const weatherImg = {
        height: '75px',
        width: 'auto'
    }

    return (
        <>
            <h3>Weather in { weather.location.name }</h3>
            <p><b>temperature:</b> { weather.current.temp_c } &#176; C</p>
            <p><b>feels like:</b> { weather.current.feelslike_c } &#176; C</p>
            <img style={ weatherImg } src={ weather.current.condition.icon } alt={ `weather condition in ${weather.location.name}` } />
            <p><b>wind:</b> { weather.current.wind_kph } km/h in direction { weather.current.wind_dir }</p>
        </>
    )
}

export default Weather
