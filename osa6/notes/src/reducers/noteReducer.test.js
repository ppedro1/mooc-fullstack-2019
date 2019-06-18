import deepFreeze from 'deep-freeze'
import { noteReducer } from './noteReducer'


describe('noteReducer', () => {
    test('returns new state with action NEW_NOTE', () => {
        const state = []
        const action = {
            type: 'NEW_NOTE',
            data: {
                content: 'joojoo testit on perseestä',
                important: false,
                id: 1
            }
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState.length).toBe(1)
        expect(newState).toContainEqual(action.data)
    })

    test('returns new state with action TOGGLE_IMPORTANCE', () => {
        const state = [
            {
              content: 'sovelluksen tila talletetaan storeen',
              important: true,
              id: 1
            },
            {
              content: 'tilanmuutokset tehdään actioneilla',
              important: false,
              id: 2
            }
        ]

        const action = {
            type: 'TOGGLE_IMPORTANCE',
            data: {
                id: 2
            }
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState.length).toBe(2)
        expect(newState).toContainEqual(state[0])
        expect(newState).toContainEqual({
            content: 'tilanmuutokset tehdään actioneilla',
            important: true,
            id: 2
        })
    })
})
