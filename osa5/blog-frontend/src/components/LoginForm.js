import React from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import blogService from '../services/blog'

const LoginForm = ({ username, setUsername, password, setPassword, user, setUser, error, setError }) => {
    const loginHandler = (evt) => {
        evt.preventDefault()

        loginService.login({
            username, password
        }).then(user => {
            blogService.setToken(user.token)
            window.localStorage.setItem('BlogAppUserLogin', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
        }).catch(error => {
            setError('väärä tunnus tai salasana')
            setTimeout(() => {
                setError(null)
            }, 2500)
        })
    }
    return(
        <div className="login-container">
            <h2>Kirjaudu sisään</h2>
            <form onSubmit={ loginHandler }>
                <div className="login-left">
                    <label htmlFor="username">Käyttäjänimi</label><br />
                    <input name="username" onChange={({ target }) => setUsername(target.value) } value={ username } />
                </div>
                <div className="login-middle">
                    <label htmlFor="password">Salasana</label><br />
                    <input name="password" onChange={({ target }) => setPassword(target.value) } value={ password } />
                </div>
                <div className="login-right">
                    <button type="submit">Kirjaudu</button>
                </div>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired
}

export default LoginForm