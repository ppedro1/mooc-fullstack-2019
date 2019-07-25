import blogService from '../services/blog'

const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_BLOG':
            console.log(action.data)
            return state.concat(action.data)
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.data)
        default:
            return state
    }
}

export const initBlogsAction = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addBlogAction = (blog) => {
    return async dispatch => {
        const insertedBlog = await blogService.insert(blog)
        dispatch({
            type: 'ADD_BLOG',
            data: insertedBlog
        })
    }
}

export const deleteBlogAction = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: id
        })
    }
}


export default blogsReducer
