import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = (props) => {

    useEffect(() => {
        props.initializeNotes()
    }, [props])

    return (
        <div>
            <VisibilityFilter />
            <NewNote />
            <Notes  />
        </div>
    )
}

const mapDispatchToProps = {
    initializeNotes
}

export default connect(null, mapDispatchToProps)(App)
