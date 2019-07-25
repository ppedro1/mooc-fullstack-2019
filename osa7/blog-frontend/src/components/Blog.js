import React, { useState } from 'react'
import blogService from '../services/blog'
import { connect } from 'react-redux'

import { setNotificationAction, nullNotificationAction } from '../reducers/notificationReducer'

const Blog = (props) => {
    const [ expand, setExpand ] = useState(false)
    const [ thisBlog, setThisBlog ] = useState(props.blog)

    const toggleExpand = () => {
        setExpand(!expand)
    }

    const setError = props.setError
    const deleteBlog = props.deleteBlog

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
                props.setNotificationAction(`Tykätty blogista: ${ thisBlog.title }`)
                setTimeout(() => {
                    props.nullNotificationAction()
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

const mapDispatchToProps = {
    setNotificationAction,
    nullNotificationAction
}

export default connect(null, mapDispatchToProps)(Blog)
