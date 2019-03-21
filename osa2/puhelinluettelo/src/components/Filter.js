import React from 'react'

const Filter = ({ newFilter, setNewFilter }) => {

    const handleFilter = (evt) => {
        setNewFilter(evt.target.value)
    }

    return (
        <>
            <form>
                <input value={ newFilter } onChange={ handleFilter } />
            </form>
        </>
    )
}

export default Filter
