import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import blogService from '../services/blog'

const LoginForm = ({ username, setUsername, password, setPassword, user, setUser, error, setError }) => {
    const userInputHook = useField('text')
    const passInputHook = useField('password')

    const userInput = Object.assign({}, userInputHook)
    const passInput = Object.assign({}, passInputHook)
    delete userInput.resetInput
    delete passInput.resetInput

    const loginHandler = (evt) => {
        evt.preventDefault()

        loginService.login({
            username: userInputHook.value,
            password: passInputHook.value
        }).then(user => {
            blogService.setToken(user.token)
            window.localStorage.setItem('BlogAppUserLogin', JSON.stringify(user))
            setUser(user)
            userInputHook.resetInput()
            passInputHook.resetInput()
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
                    <input { ...userInput } />
                </div>
                <div className="login-middle">
                    <label htmlFor="password">Salasana</label><br />
                    <input { ...passInput } />
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
