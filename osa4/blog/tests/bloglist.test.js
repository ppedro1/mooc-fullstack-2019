const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('GET tests', () => {
    test('Check that blogs are returned', async () => {
        const results = await api.get('/api/blogs')

        expect(results.body.length).toBe(helper.initialBlogs.length)
    })

    test('Check that blogs are returned as JSON', async () => {
        const result = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Check that _id is transformed into id', async () => {
        const results = await api.get('/api/blogs')

        expect(results.body[0]._id).not.toBeDefined()
        expect(results.body[0].id).toBeDefined()
    })
})

describe('POST tests', () => {
    test('Insert valid blog', async () => {
        const newBlog = {
            title: 'pökäle',
            author: 'asdfasdfasdfasd',
            url: 'https://alskdjfdsafsadfsadf',
        }

        console.log(newBlog)

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        const blogs = await helper.blogsInDb()
        expect(blogs.length).toBe(helper.initialBlogs.length + 1)

        const titles = blogs.map(blog => blog.title)
        expect(titles).toContain(newBlog.title)
    })
    test('Invalid blog isnt added to database', async () => {
        const newBlog = {
            author: 'bögäle'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogs = await helper.blogsInDb()
        expect(blogs.length).toBe(helper.initialBlogs.length)
    })

    test('If likes arent provided, set likes to zero', async () => {
        const newBlog = {
            author: 'agagagagag',
            title: 'ögögögögögö',
            url: 'https://balaasdlkfjasdfsad.com',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        const addedBlog = await Blog.find({ author: newBlog.author, title: newBlog.title, url: newBlog.url })
        expect(addedBlog[0].likes).toBe(0)
    })
})

describe('DELETE tests', () => {
    test('delete a post with ID', async () => {
        const blogs = await helper.blogsInDb()
        await api
            .delete(`/api/blogs/${blogs[0].id}`)
            .expect(204)

        const blogsInDb = await helper.blogsInDb()
        expect(blogsInDb.length).toBe(helper.initialBlogs.length - 1)
    })
})

describe('PUT tests', () => {
    test('modify an existing blog with PUT', async () => {
        const blogs = await helper.blogsInDb()
        const id = blogs[0].id

        const updatedBlog = {
            author: 'tämäupdatetämäupdatetämäupdate',
            title: 'tämätitletämätitletämätitletämätitle',
            likes: 44,
        }

        await api
            .put(`/api/blogs/${id}`)
            .send(updatedBlog)
            .expect(200)

        const blogInQuestion = await Blog.findById(id)
        console.log(blogInQuestion.toJSON())
        expect(blogInQuestion.author).toBe(updatedBlog.author)
    })
})

afterAll(() => {
    mongoose.disconnect()
})
