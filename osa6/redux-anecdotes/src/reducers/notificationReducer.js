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

export const setNotificationAction = (notification) => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            notification
        }
    }
}

export const resetNotificationAction = () => {
    return {
        type: 'RESET_NOTIFICATION'
    }
}

export default notificationReducer
