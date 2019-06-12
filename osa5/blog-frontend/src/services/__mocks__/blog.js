const blogs = [
    {
        author: 'author 1',
        title: 'blog 1',
        url: 'urliiiiiiiii 1',
        likes: 0
    },
    {
        author: 'author 2',
        title: 'blog 2',
        url: 'urliiiiiiiii 2',
        likes: 0
    },
    {
        author: 'author 3',
        title: 'blog 3',
        url: 'urliiiiiiiii 3',
        likes: 0
    },
    {
        author: 'author 4',
        title: 'blog 4',
        url: 'urliiiiiiiii 4',
        likes: 0
    }
]

let token = null
const setToken = (newToken) => {
    token = `bearer ${ newToken }`
}

const getAll = () => Promise.resolve(blogs)

export default { getAll, setToken }
