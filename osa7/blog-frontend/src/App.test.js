import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blog')
import App from './App'

describe('<App />', () => {
    it('if no logon, show login', async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)
        await waitForElement(
            () => component.getByText('Kirjaudu')
        )

        console.log(component.container.querySelectorAll('.blog-container').length)
    })

    it('if logon show blogs', async () => {
        const user = {
          username: 'peetu',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlZXR1IiwiaWQiOiI1Y2VlZjU4OTBmYzFkNDYwOTAwN2FiZTEiLCJpYXQiOjE1NTk5NzQ5MTd9.8CQmjbAW2bmqcOETVFK-oQIxxImfBPE1Vs8kdo5IqmQ',
          name: 'peetu p',
          id: '5ceef5890fc1d4609007abe1'
        }

        localStorage.setItem('BlogAppUserLogin', JSON.stringify(user))

        const component = render(
            <App />
        )
        component.rerender(<App />)
        await waitForElement(
            () => component.getByText('Kirjaudu')
        )

        console.log(component.container)

    })
})
