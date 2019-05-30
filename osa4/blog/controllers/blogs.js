const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({}).populate('user', { id: 1, username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    return response.json(blog.toJSON())
})

blogRouter.post('/', async (request, response, next) => {
    const user = await User.findById(request.body.userId)

    const blog = new Blog({
        author: request.body.author,
        title: request.body.title,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: user._id
    })

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'invalid token' })
        }

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)

        response.status(200).json(savedBlog)
    } catch(e) {
        next(e)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    const token = getTokenFrom(request)
    const user = User.findById(request.body.userId)
    const body = request.body

    let blog = await Blog.findById(id)
    blog = blog.toJSON()

    const newBlog = {
        title: body.title || blog.title,
        author: body.author || blog.author,
        likes: body.likes || blog.likes,
        user: user._id
    }

    try {
        await Blog.findByIdAndUpdate(id, newBlog, { new: true })
        response.status(200).json(newBlog)
    } catch (e) {
        next(e)
    }
})

const getUserToken = async (id) => {
    let user = await User.findById(id)
    user = user.toJSON()

    let userForToken = {
        username: user.username,
        id: user._id
    }

    return jwt.sign(userForToken, process.env.SECRET)
}

blogRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id
    const requestToken = jwt.verify(request.token, process.env.SECRET)
    let blog = await Blog.findById(id)

    try {
        if (!blog.user.toString() === requestToken.id.toString()) {
            response.status(403).json({
                error: 'bad auth'
            })
        }
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } catch(e) {
        next(e)
    }
})

module.exports = blogRouter
