const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            state = ''
            return action.data.notification
        case 'RESET_NOTIFICATION':
            return state = ''
        default:
            return state
    }
}

export const setNotification = (notification, delay) => {
    const multipliedDelay = delay * 1000
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                notification
            }
        })
        setTimeout(() => {
            dispatch({
                type: 'RESET_NOTIFICATION'
            })
        }, multipliedDelay)
    }
}

export default notificationReducer
