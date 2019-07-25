import React from 'react'

const LogoutButton = ({ setUser }) => {
    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('BlogAppUserLogin')
    }
    return(
        <div className="logout-button">
            <button onClick={ handleLogout }>Kirjaudu ulos</button>
        </div>
    )
}

export default LogoutButton
