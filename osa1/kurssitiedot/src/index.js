import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
    console.log(props)
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    console.log(props);
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
    )
}
const Part = (props) => {
    console.log(props)
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}
const Total = (data) => {
    return (
        <p>yhteensä {data.total} tehtävää</p>
    )
}

const App = () => {
      const course = {
          name: 'Half Stack -sovelluskehitys',
          parts: [
              { name: 'Reactin perusteet', exercises: 10 },
              { name: 'Tiedonvälitys propseilla', exercises: 7 },
              { name: 'Komponenttien tila', exercises: 14  }
          ]
      }

      const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;

  return (
    <div>
        <Header course={course.name} />

        <Content parts={course.parts}
        />

        <Total total={total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
