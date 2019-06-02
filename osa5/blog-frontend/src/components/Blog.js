import React, { useState } from 'react'
import blogService from '../services/blog'

const Blog = ({ author, title, likes, url }) => {
    const [ expand, setExpand ] = useState(false)

    const toggleExpand = () => {
        setExpand(!expand)
    }

    const likeBlog = (evt) => {
        console.log(evt)
    }

    return(
        <div className="blog-container">
            <h3 onClick={ toggleExpand }>{ title }</h3>
            <div className={ (expand) ? 'visible' : 'hidden' }>
                <h5>{ url }</h5>
                <p>{ author }</p>
                <p>{ likes } <button onClick={ likeBlog }>Like</button></p>
            </div>
        </div>
    )
}

export default Blog
