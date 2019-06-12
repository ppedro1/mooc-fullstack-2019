import React, { useState } from 'react'
import blogService from '../services/blog'

const Blog = ({ blog, setError, setNotification, deleteBlog }) => {
    const [ expand, setExpand ] = useState(false)
    const [ thisBlog, setThisBlog ] = useState(blog)

    const toggleExpand = () => {
        setExpand(!expand)
    }

    const userLogin = JSON.parse(localStorage.getItem('BlogAppUserLogin'))

    const likeBlog = (evt) => {
        const updatedBlog = {
          author: thisBlog.author,
          title: thisBlog.title,
          url: thisBlog.url,
          likes: thisBlog.likes + 1,
        }

        console.log('inside likeBlog')

        blogService
            .update(thisBlog.id, updatedBlog)
            .then(response => {
                const changedBlog = {
                    ...thisBlog, likes: updatedBlog.likes
                }
                setThisBlog(changedBlog)
                setNotification(`Tykätty blogista: ${ thisBlog.title }`)
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


    return(
        <div className="blog-container">
            <h3 onClick={ toggleExpand }>{ thisBlog.title }</h3>
            <div className={ (expand) ? 'visible' : 'hidden' }>
                <h5>{ thisBlog.url }</h5>
                <p>{ thisBlog.author }</p>
                <p>{ thisBlog.likes } <button onClick={ likeBlog }>Like</button></p>
                {
                    (userLogin.id.toString() === thisBlog.user.id.toString()) &&
                    <button onClick={ () => deleteBlog(thisBlog) }>Poista blogi</button>
                }
            </div>
        </div>
    )
}

export default Blog
