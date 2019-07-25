import React from 'react'

const UserInfo = ({ username }) => {
    return(
        <div>
            Kirjautuneena käyttäjänä: { username }
        </div>
    )
}

export default UserInfo
