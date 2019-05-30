import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs }) => {

    const blogList = () => blogs.map(blog => <Blog key={ blog.id } author={ blog.author } title={ blog.title } url={ blog.url } likes={ blog.likes } />)

    return(
        <div className="blog-list-container">
            { blogList() }
        </div>
    )
}

export default BlogList
