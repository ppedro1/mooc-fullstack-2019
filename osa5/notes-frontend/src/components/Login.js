import React from 'react'
import loginService from '../services/login'
import noteService from '../services/notes'

const Login = ({ username, setUsername, password, setPassword, user, setUser, setError }) => {
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log(`${username} // ${password}`)
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setError('käyttäjätunnus tai salasana väärin')
            setTimeout(() => {
                setError(null)
            }, 2500)
        }
    }

    return (
        <div>
            <h2>Kirjaudu</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Käyttäjänimi <br />
                    <input type="text" value={ username } onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    Salasana <br />
                    <input type="password" value={ password } onChange={({target}) => setPassword(target.value)} />
                </div>
                <button type="submit">kirjaudu</button>
            </form>
        </div>
    )
}

export default Login
