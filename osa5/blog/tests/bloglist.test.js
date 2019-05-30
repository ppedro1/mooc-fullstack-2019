const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVjZWYwZGY1Zjk0NzdmNzAzMmE3MjU4NiIsImlhdCI6MTU1OTE3MDU2MX0.EnQ9_vX1MSWpLmZZ_RdmzSBGALMttIqomOr9BeiTzvA"

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const userObjects = helper.initialUsers.map(user => new User(user))
    const userPromises = userObjects.map(user => user.save())
    await Promise.all(userPromises)

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const blogPromises = blogObjects.map(blog => blog.save())
    await Promise.all(blogPromises)
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
        const user = await User.findOne({ username: 'root' })
        console.log(user)
        const newBlog = {
            title: 'pökäle',
            author: 'asdfasdfasdfasd',
            url: 'https://alskdjfdsafsadfsadf',
            userId: user._id
        }

        console.log(newBlog)

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(200)

        const blogs = await helper.blogsInDb()
        expect(blogs.length).toBe(helper.initialBlogs.length + 1)

        const titles = blogs.map(blog => blog.title)
        expect(titles).toContain(newBlog.title)
    })
    test('Invalid blog isnt added to database', async () => {
        const user = await User.findOne({ username: 'root' })
        const newBlog = {
            author: 'bögäle',
            userId: user._id
        }

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(400)

        const blogs = await helper.blogsInDb()
        expect(blogs.length).toBe(helper.initialBlogs.length)
    })

    test('If likes arent provided, set likes to zero', async () => {
        const user = await User.findOne({ username: 'root' })
        const newBlog = {
            author: 'agagagagag',
            title: 'ögögögögögö',
            url: 'https://balaasdlkfjasdfsad.com',
            userId: user._id
        }

        await api
            .post('/api/blogs')
            .set('Authorization', token)
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
        const user = await User.findOne({ username: 'root' })
        const blogs = await helper.blogsInDb()
        const id = blogs[0].id

        const updatedBlog = {
            author: 'tämäupdatetämäupdatetämäupdate',
            title: 'tämätitletämätitletämätitletämätitle',
            likes: 44,
            userId: user._id
        }

        await api
            .put(`/api/blogs/${id}`)
            .set('Authorization', token)
            .send(updatedBlog)
            .expect(200)

        const blogInQuestion = await Blog.findById(id)
        expect(blogInQuestion.author).toBe(updatedBlog.author)
    })
})

describe('users tests', () => {
    test('no duplicate usernames', async () => {
        const newUser = {
            username: 'root',
            password: 'verryverrysecret'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        expect(users.length).toBe(helper.initialUsers.length)
    })
    test('no too short usernames', async () => {
        const newUser = {
            username: 'as',
            password: 'asdasdasd'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        expect(users.length).toBe(helper.initialUsers.length)
    })
    test('no too short passwords', async () => {
        const newUser = {
            username: 'asasdfasdf',
            password: 'as'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        expect(users.length).toBe(helper.initialUsers.length)
    })
})

afterAll(() => {
    mongoose.disconnect()
})
