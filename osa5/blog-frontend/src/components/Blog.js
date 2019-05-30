import React from 'react'

const Blog = ({ author, title, likes, url }) => {
    return(
        <div className="blog-container">
            <h3>{ title }</h3>
            <h5>{ url }</h5>
            <p>{ author }</p>
            <p>{ likes }</p>
        </div>
    )
}

export default Blog
