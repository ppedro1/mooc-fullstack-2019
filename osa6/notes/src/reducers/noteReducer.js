const initialState = [
    {
        content: 'reduxin storen toiminnan määrittelee reduceri',
        important: true,
        id: 1
    },
    {
        content: 'storen tilassa voi olla mielivaltaista dataa',
        important: true,
        id: 2
    }
]


export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            state = state.concat(action.data)
            return state
        case 'TOGGLE_IMPORTANCE':
            const id = action.data.id
            const noteToChange = state.find(note => note.id === id)
            const changedNote = {
                ...noteToChange, important: !noteToChange.important
            }
            return state.map(note => note.id !== id ? note : changedNote)
        default:
            return state
    }
}


const generateId = () => Number((Math.random() * 100000).toFixed(0))

export const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        data: {
            content,
            important: false,
            id: generateId()
        }
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        data: {
            id
        }
    }
}
