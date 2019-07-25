import React from 'react'
import ReactDOM from 'react-dom'
import PromisePolyfill from 'promise-polyfill'

if (!window.Promise) {
    window.Promise = PromisePolyfill
}

import './index.css'

import App from './App'

const hello = name => {
    console.log(`hello ${ name }`)
}

ReactDOM.render(<App />, document.getElementById('root'))
