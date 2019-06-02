import React from 'react'

const Login = ({ username, setUsername, password, setPassword, user, setUser, setError, handleSubmit }) => {
    return (
        <div>
            <h2>Kirjaudu</h2>
            <form onSubmit={ handleSubmit }>
                <div>
                    Käyttäjänimi <br />
                    <input type="text" value={ username } onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    Salasana <br />
                    <input type="password" value={ password } onChange={({target}) => setPassword(target.value)} />
                </div>
                <div>
                    <button type="submit">kirjaudu</button>
                </div>
            </form>
        </div>
    )
}

export default Login
