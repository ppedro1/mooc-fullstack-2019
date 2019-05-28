const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog({
        author: request.body.author,
        title: request.body.title,
        url: request.body.url,
        likes: request.body.likes || 0
    })
    try {
        await blog.save()
        response.status(200).end()
    } catch(e) {
        next(e)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    const body = request.body

    let blog = await Blog.findById(id)
    blog = blog.toJSON()

    const newBlog = {
        title: body.title || blog.title,
        author: body.author || blog.author,
        likes: body.likes || blog.likes
    }

    try {
        await Blog.findByIdAndUpdate(id, newBlog, { new: true })
        response.status(200).json(newBlog)
    } catch (e) {
        next(e)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id
    try {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } catch(e) {
        next(e)
    }
})

module.exports = blogRouter
