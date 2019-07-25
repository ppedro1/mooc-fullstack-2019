import React, { useState } from 'react'
import blogService from '../services/blog'
import { connect } from 'react-redux'

import { setNotificationAction, nullNotificationAction } from '../reducers/notificationReducer'
import { addBlogAction } from '../reducers/blogsReducer'

const NewBlog = (props) => {
    const [ author, setAuthor ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ url, setUrl ] = useState('')
    const [ formVisibility, setFormVisibility ] = useState(false)

    const blogs = props.blogs
    const user = props.user
    const setError = props.setError

    const handleNewBlog = (evt) => {
        evt.preventDefault()

        new Promise(() => {
            const newBlog = {
                author,
                title,
                url,
                user: user.id
            }
            props.addBlogAction(newBlog)
            return newBlog
        })
        .then((newBlog) => {
            props.setNotificationAction(`Uusi blog "${ newBlog.title }" lisätty`)
            setTimeout(() => { props.nullNotificationAction() }, 2500)
            handleToggleForm()
        })
        .catch(error => {
            setError('Virhe lisättäessä uutta blogia, tarkista kentät')
            setTimeout(() => {
                setError(null)
            }, 2500)
        })
    }

    const handleToggleForm = () => {
        setFormVisibility(!formVisibility)
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return(
        <div className="new-blog-container">
            <button className="add-blog-header-button" onClick={ handleToggleForm }>{ (formVisibility) ? 'Peruuta' : 'Lisää blogi' }</button>
            {
                (formVisibility) &&
                <div className="insert-blog-form">
                    <h3>Lisää uusi blogi</h3>
                    <form onSubmit={ handleNewBlog }>
                        <label htmlFor="title">Otsikko</label><br />
                        <input name="title" value={ title } onChange={ ({ target }) => setTitle(target.value) } /><br />
                        <label htmlFor="author">Kirjoittaja</label><br />
                        <input name="author" value={ author } onChange={ ({ target }) => setAuthor(target.value) } /><br />
                        <label htmlFor="url">URL-osoite</label><br />
                        <input name="url" value={ url } onChange={ ({ target }) => setUrl(target.value) }/><br />
                        <br />
                        <button type="submit">Lisää</button>
                    </form>
                </div>
            }
        </div>
    )
}

const mapDispatchToProps = {
    setNotificationAction,
    nullNotificationAction,
    addBlogAction
}

export default connect(null, mapDispatchToProps)(NewBlog)
