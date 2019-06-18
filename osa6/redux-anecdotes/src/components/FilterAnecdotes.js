import React from 'react'
import { connect } from 'react-redux'
import { setFilterAction } from '../reducers/filterReducer'

const FilterAnecdotes = (props) => {
    const handleChange = (event) => {
        props.setFilterAction(event.target.value)
    }

    const inputStyle = {
        marginTop: '2rem'
    }

    return(
        <div style={ inputStyle }>
            Filter:<br />
            <input type="text" onChange={ handleChange } value={ props.filter } />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}

const mapDispatchToProps = {
    setFilterAction
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterAnecdotes)
