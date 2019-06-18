import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {
    const filterSelected = (value) => () => {
        props.filterChange(value)
    }

    return(
        <div>
            kaikki <input type="radio" name="filter" onChange={ filterSelected('ALL') } /><br />
            tärkeät <input type="radio" name="filter" onChange={ filterSelected('IMPORTANT') } /><br />
            ei tärkeät <input type="radio" name="filter" onChange={ filterSelected('NONIMPORTANT') } /><br />
        </div>
    )
}

export default connect(null, { filterChange })(VisibilityFilter)
