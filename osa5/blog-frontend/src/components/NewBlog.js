import React, { useState } from 'react'
import blogService from '../services/blog'

const NewBlog = ({ setBlogs, blogs, setError, setNotification }) => {
    const [ author, setAuthor ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ url, setUrl ] = useState('')
    const [ formVisibility, setFormVisibility ] = useState(false)

    const handleNewBlog = (evt) => {
        evt.preventDefault()

        blogService
            .insert({
                author: author,
                title: title,
                url: url
            })
            .then(insertedBlog => {
                setBlogs(blogs.concat(insertedBlog))
                setNotification(`Uusi blogi "${insertedBlog.title}" lisätty`)
                setTimeout(() => { setNotification(null) }, 2500)
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

    console.log(formVisibility)

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

export default NewBlog
