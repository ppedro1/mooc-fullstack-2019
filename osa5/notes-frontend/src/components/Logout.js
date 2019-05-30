import React from 'react'

const Logout = ({ setUser }) => {
    const handleLogout = () => {
        window.localStorage.removeItem('loggedNoteAppUser')
        setUser(null)
    }
    return(
        <>
            <button onClick={ handleLogout }>Kirjaudu ulos</button>
        </>
    )
}

export default Logout
