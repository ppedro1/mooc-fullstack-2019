import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent, getByText, toHaveStyle } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    const blog = {
        author: 'testiauthor',
        title: 'testititle',
        url: 'testiurl',
        likes: 666
    }

    let component

    const mockClick = jest.fn()

    beforeEach(() => {
        component = render(
            <SimpleBlog blog={ blog } onClick={ mockClick } />
        )
    })

    it('author and title are right', () => {
        const authorTitle = component.container.querySelector('.title-author')
        expect(authorTitle).toHaveTextContent('testititle testiauthor')
    })

    it('likes are right', () => {
        const likes = component.container.querySelector('.blog-likes')
        expect(likes).toHaveTextContent('blog has 666 likes')
    })

    it('two clicks are registered', () => {
        const button = component.container.querySelector('.like-button')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockClick.mock.calls.length).toBe(2)
    })

    afterEach(cleanup)
})
