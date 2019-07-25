import React from 'react'
import Blog from './Blog'
import blogService from '../services/blog'

import { connect } from 'react-redux'
import { setNotificationAction, nullNotificationAction } from '../reducers/notificationReducer'
import { deleteBlogAction } from '../reducers/blogsReducer'

const BlogList = (props) => {

    const blogs = props.blogs
    const setBlogs = props.setBlogs
    const setError = props.setError

    const deleteBlog = (blog) => {
        if(window.confirm(`Haluatko poistaa blogin '${ blog.title }'?`)){
            blogService
                .deleteBlog(blog.id)
                .then(response => {
                    props.deleteBlogAction(blog.id)
                    props.setNotificationAction(`Blogi poistettu`)
                    setTimeout(() => {
                        props.nullNotificationAction()
                    }, 1500)
                })
                .catch(error => {
                    setError(`Blogin poisto epäonnistui: ${ error }`)
                    setTimeout(() => {
                        setError(null)
                    }, 1500)
                })
        }
    }

    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    const blogList = () => sortedBlogs.map(blog => <Blog key={ blog.id } blog={ blog } setError={ setError } deleteBlog={ deleteBlog } />)

    return(
        <div className="blog-list-container">
            { blogList() }
        </div>
    )
}

const mapDispatchToProps = {
    setNotificationAction,
    nullNotificationAction,
    deleteBlogAction
}

export default connect(null, mapDispatchToProps)(BlogList)
