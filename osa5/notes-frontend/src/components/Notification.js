import React from 'react'

const notifStyles = {
    fontSize: '3rem',
    backgroundColor: 'red',
    color: 'black',
    padding: '1rem 2rem'
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="notification" style={ notifStyles }>
            { message }
        </div>
    )
}

export default Notification
