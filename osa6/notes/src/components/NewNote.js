import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {

    const addNote = (evt) => {
        evt.preventDefault()
        props.createNote(evt.target.note.value)
        evt.target.note.value = ''
    }

    return(
        <div>
            <form onSubmit={ addNote }>
                <input name="note" />
                <button type="submit">lisää</button>
            </form>
        </div>
    )
}

export default connect(null, { createNote })(NewNote)
