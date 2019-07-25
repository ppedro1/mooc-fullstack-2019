import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import blogService      from './services/blog'
import { initBlogsAction } from './reducers/blogsReducer'

import LoginForm        from './components/LoginForm'
import LogoutButton     from './components/LogoutButton'
import BlogList         from './components/BlogList'
import UserInfo         from './components/UserInfo'
import NewBlog          from './components/NewBlog'
import ErrorMessage     from './components/ErrorMessage'
import Notification     from './components/Notification'

import './App.css'

const App = (props) => {
    const [ error, setError ]               = useState(null)
    const [ username, setUsername ]         = useState('')
    const [ password, setPassword ]         = useState('')
    const [ user, setUser ]                 = useState(null)
    const [ blogs, setBlogs ]               = useState([])

    useEffect(() => {
        props.initBlogsAction()
     }, [])
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
            <>
                <div className="header-bar">
                    { (error === null) ? ' ' : <ErrorMessage message={ error } /> }
                </div>
                <LoginForm
                    username={ username }
                    setUsername={ setUsername }
                    password={ password }
                    setPassword={ setPassword }
                    setUser={ setUser }
                    user={ user }
                    setError={ setError }
                    error={ error }
                    />
            </>
        )
    }
    return(
        <>
            <div className="header-bar">
                { (error === null) ? ' ' : <ErrorMessage message={ error } /> }
                { (props.notification === null) ? ' ' : <Notification message={ props.notification } /> }
            </div>
            <div className="left">
                <h2>Blogilista</h2>
                <UserInfo username={ user.username } />
                <LogoutButton setUser={ setUser } />
                <NewBlog blogs={ props.blogs } user={ user } setBlogs={ setBlogs } setError={ setError } />
            </div>
            <div className="right">
                <BlogList blogs={ props.blogs } setBlogs={ setBlogs } setError={ setError } />
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    initBlogsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
