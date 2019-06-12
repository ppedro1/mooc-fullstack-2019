import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent, getByText, toHaveStyle } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Togglable from './Togglable'

describe('<Togglable />', () => {
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv" />
            </Togglable>
        )
    })

    it('renders its children', () => {
        component.container.querySelector('.testDiv')
    })

    it('at start the children are not displayed', () => {
        const div = component.container.querySelector('.togglable-content')
        expect(div).toHaveStyle('display: none')
    })

    it('after clicking the button, children are displayed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglable-content')
        expect(div).not.toHaveStyle('display: none')
    })

    afterEach(cleanup)

})
