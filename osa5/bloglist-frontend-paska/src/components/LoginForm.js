import React from 'react'

const LoginForm = ({ username, setUsername, password, setPassword, user, setUser }) => {
    const loginHandler = (evt) => {
        evt.preventDefault()
        
    }
    return(
        <div className="login-container">
            <h2>Kirjaudu sisään</h2>
            <form onSubmit={ loginHandler }>
                <label for="username">Käyttäjänimi</label><br />
                <input name="username" onChange={ setUsername } value={ username } /><br />
                <label for="password">Salasana</label><br />
                <input name="password" onChange={ setPassword } value={ password } /><br />
                <button type="submit">Kirjaudu</button>
            </form>
        </div>
    )
}

export default LoginForm
