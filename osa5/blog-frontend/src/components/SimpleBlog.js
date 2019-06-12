import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className="simple-blog">
    <div className="title-author">
      {blog.title} {blog.author}
    </div>
    <div className="blog-likes">
      blog has {blog.likes} likes
      <button className="like-button" onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
