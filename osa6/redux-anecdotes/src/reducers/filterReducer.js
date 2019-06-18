const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.data.filter
        default:
            return state
    }
}

export const setFilterAction = (filter) => {
    return {
        type: 'SET_FILTER',
        data: {
            filter
        }
    }
}

export default filterReducer
