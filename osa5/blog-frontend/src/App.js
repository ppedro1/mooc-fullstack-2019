import React, { useEffect, useState } from 'react'

import blogService      from './services/blog'

import LoginForm        from './components/LoginForm'
import LogoutButton     from './components/LogoutButton'
import BlogList         from './components/BlogList'
import UserInfo         from './components/UserInfo'
import NewBlog          from './components/NewBlog'
import ErrorMessage     from './components/ErrorMessage'
import Notification     from './components/Notification'

import './App.css'

function App() {
    const [ notification, setNotification ] = useState(null)
    const [ error, setError ]               = useState(null)
    const [ username, setUsername ]         = useState('')
    const [ password, setPassword ]         = useState('')
    const [ user, setUser ]                 = useState(null)
    const [ blogs, setBlogs ]               = useState([])

    useEffect(() => { blogService.getAll().then(blogs => setBlogs(blogs)) }, [])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('BlogAppUserLogin')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])


    if (user === null) {
        return (
            <div>
                <LoginForm
                    username={ username }
                    setUsername={ setUsername }
                    password={ password }
                    setPassword={ setPassword }
                    setUser={ setUser }
                    user={ user }
                    />
            </div>
        )
    }
    return(
        <>
            <div className="header-bar">
                { (error === null) ? ' ' : <ErrorMessage message={ error } /> }
                { (notification === null) ? ' ' : <Notification message={ notification } /> }
            </div>
            <div className="left">
                <h2>Blogilista</h2>
                <UserInfo username={ user.username } />
                <LogoutButton setUser={ setUser } />
                <NewBlog blogs={ blogs } setBlogs={ setBlogs } setError={ setError } setNotification={ setNotification } />
            </div>
            <div className="right">
                <BlogList blogs={ blogs } />
            </div>
        </>
    )
}

export default App
