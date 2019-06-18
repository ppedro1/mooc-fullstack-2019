import React from 'react'
import { connect } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Notes = (props) => {
    return(
        <div>
            <ul>
                {
                    props.visibleNotes.map(note =>
                        <li key={ note.id }>{ note.content }
                            <strong>
                                <button onClick={ () => props.toggleImportanceOf(note.id) }>
                                    { note.important ? 'tärkeä' : 'ei tärkeä' }
                                </button>
                            </strong>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

const notesToShow = ({ notes, filter }) => {
    if (filter === 'ALL') {
        return notes
    }
    return filter === 'IMPORTANT' ?
        notes.filter(note => note.important) :
        notes.filter(note => !note.important)
}

const mapStateToProps = (state) => {
    return {
        visibleNotes: notesToShow(state)
    }
}

const mapDispatchToProps = {
    toggleImportanceOf
}

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)

export default ConnectedNotes
