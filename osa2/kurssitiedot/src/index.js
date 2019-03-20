import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const courses = [
    {
        name: 'Half Stack -sovelluskehitys',
        id: 1,
        parts: [
            { id: 1, name: 'Reactin perusteet', exercises: 10 },
            { id: 2, name: 'Tiedonvälitys propseilla', exercises: 7 },
            { id: 3, name: 'Komponenttien tila', exercises: 14 },
            { id: 4, name: 'Redux', exercises: 7 }
        ]
    },
    {
        name: 'Node.js',
        id: 2,
        parts: [
            { id: 1, name: 'Routing', exercises: 3 },
            { id: 2, name: 'Middlewaret', exercises: 7 }
        ]
    }
]

const App = ({ courses }) => {
    return (
        <div>
            <h1>Opetusohjelma</h1>
            { courses.map(course => <Course key={ course.id } course={ course } />) }
        </div>
    )
}

ReactDOM.render(<App courses={ courses }/>, document.getElementById('root'))
