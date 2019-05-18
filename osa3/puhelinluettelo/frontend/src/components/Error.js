import React from 'react'

const Error = ({ errorMessage }) => {
    if (errorMessage === null) {
        return null
    }

    return (
        <div className="error-panel">
            Virhe! { errorMessage }
        </div>
    )
}

export default Error
