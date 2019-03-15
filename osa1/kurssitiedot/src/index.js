import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.part1} exer={props.exercises1} />
            <Part part={props.part2} exer={props.exercises2} />
            <Part part={props.part3} exer={props.exercises3} />
        </div>
    )
}
const Part = (props) => {
    return (
        <p>{props.part} {props.exer}</p>
    )
}
const Total = (data) => {
    return (
        <p>yhteensä {data.total} tehtävää</p>
    )
}



const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14
  const total = exercises1 + exercises2 + exercises3;

  return (
    <div>
        <Header course={course} />

        <Content part1={part1} exercises1={exercises1}
                 part2={part2} exercises2={exercises2}
                 part3={part3} exercises3={exercises3}
        />

        <Total total={total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
