import React from 'react'
import Blog from './Blog'
import blogService from '../services/blog'

const BlogList = ({ blogs, setBlogs, setError, setNotification }) => {

    const deleteBlog = (blog) => {
        if(window.confirm(`Haluatko poistaa blogin '${ blog.title }'?`)){
            blogService
                .deleteBlog(blog.id)
                .then(response => {
                    setBlogs(blogs.filter(b => b.id !== blog.id))
                    setNotification(`Blogi poistettu`)
                    setTimeout(() => {
                        setNotification(null)
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
    const blogList = () => sortedBlogs.map(blog => <Blog key={ blog.id } blog={ blog } setError={ setError } setNotification={ setNotification } deleteBlog={ deleteBlog } />)

    return(
        <div className="blog-list-container">
            { blogList() }
        </div>
    )
}

export default BlogList
