import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/notes')
import App from './App'

describe('<App />', () => {
    it('renders all blogs from backend', async () => {
        const component = render(
            <App />
        )

        component.rerender(<App />)
        await waitForElement(
            () => component.container.querySelector('.note-row')
        )

        const notes = component.container.querySelectorAll('.note-row')
        expect(notes.length).toBe(3)

        expect(component.container).toHaveTextContent(
            'HTML on helppoa'
        )

        expect(component.container).toHaveTextContent(
            'Selain pystyy suorittamaan vain javascriptiä'
        )

        expect(component.container).toHaveTextContent(
            'HTTP-protokollan tärkeimmät metodit ovat GET ja POST'
        )
    })
})
