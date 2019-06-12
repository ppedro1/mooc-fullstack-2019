import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

afterEach(cleanup)

test('renders content', () => {
    const note = {
        content: 'komponenttitestaustapahtuublablabla',
        important: true
    }

    const component = render(
        <Note note={ note } />
    )

    component.debug()

    expect(component.container).toHaveTextContent(
        note.content
    )

    const element = component.getByText(note.content)
    expect(element).toBeDefined()

    const div = component.container.querySelector('.note-row')
    expect(div).toHaveTextContent(note.content)

    const li = component.container.querySelector('li')

})
