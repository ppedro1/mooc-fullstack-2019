import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {

    const addNote = async (evt) => {
        evt.preventDefault()
        const content = evt.target.note.value
        evt.target.note.value = ''
        props.createNote(content)
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
