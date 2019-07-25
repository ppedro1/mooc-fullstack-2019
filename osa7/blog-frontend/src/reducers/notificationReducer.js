const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const setNotificationAction = (notif) => {
    return dispatch => {
        dispatch({ type: 'SET_NOTIFICATION', data: notif })
    }
}

export const nullNotificationAction = () => {
    return dispatch => {
        dispatch({ type: 'SET_NOTIFICATION', data: null })
    }
}

export default notificationReducer
