import React from 'react'

const Filter = ({ newFilter, setNewFilter }) => {

    const handleFilter = (evt) => {
        setNewFilter(evt.target.value)
    }

    return (
        <div>
            <form>
                <input value={ newFilter } onChange={ handleFilter } />
            </form>
        </div>
    )
}

export default Filter
