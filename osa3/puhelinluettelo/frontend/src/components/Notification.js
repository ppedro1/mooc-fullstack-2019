import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="notif-panel">
            { message }
        </div>
    )
}


export default Notification
