import React, { useState } from 'react'
import blogService from '../services/blog'

const Blog = ({ id, author, title, user, likes, url, setError, setNotification, deleteBlog }) => {
    const [ expand, setExpand ] = useState(false)
    const [ blog, setBlog ] = useState({ id: id, author: author, user: user, title: title, likes: likes, url: url })

    const toggleExpand = () => {
        setExpand(!expand)
    }

    const userLogin = JSON.parse(localStorage.getItem('BlogAppUserLogin'))

    const likeBlog = (evt) => {
        const updatedBlog = {
          author: blog.author,
          title: blog.title,
          url: blog.url,
          likes: blog.likes + 1,
        }
        blogService
            .update(id, updatedBlog)
            .then(response => {
                const changedBlog = {
                    ...blog, likes: updatedBlog.likes
                }
                setBlog(changedBlog)
                setNotification(`Tykätty blogista: ${ blog.title }`)
                setTimeout(() => {
                    setNotification(null)
                }, 2500)
            })
            .catch(error => {
                setError(`Blogista tykkäys epäonnistui`)
                setTimeout(() => {
                    setError(null)
                }, 2500)
            })
    }

    console.log(blog.id)

    return(
        <div className="blog-container">
            <h3 onClick={ toggleExpand }>{ blog.title }</h3>
            <div className={ (expand) ? 'visible' : 'hidden' }>
                <h5>{ blog.url }</h5>
                <p>{ blog.author }</p>
                <p>{ blog.likes } <button onClick={ likeBlog }>Like</button></p>
                {
                    (userLogin.id.toString() === blog.user.id.toString()) &&
                    <button onClick={ () => deleteBlog(blog) }>Poista blogi</button>
                }
            </div>
        </div>
    )
}

export default Blog
