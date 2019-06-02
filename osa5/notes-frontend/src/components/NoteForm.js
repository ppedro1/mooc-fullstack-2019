import React from 'react'

const NoteForm = ({ onSubmit, handleChange, value }) => {
    return(
        <form onSubmit={ onSubmit }>
            <input value={ value } onChange={ handleChange } />
            <button type="submit">tallenna muistiinpano</button>
        </form>
    )
}

export default NoteForm
