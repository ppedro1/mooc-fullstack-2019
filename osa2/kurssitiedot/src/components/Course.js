import React from 'react'

// print the course header and content
const Course = ({ course }) => {
    return (
        <>
            <CourseHeader title={ course.name } />
            <Content parts={ course.parts } />
        </>
    )
}
// course header component
const CourseHeader = ({ title }) => {
    return (
        <h1>{ title }</h1>
    )
}
// print course parts and total number of exercises
const Content = ({ parts }) => {
    const total = parts.reduce((a, b) => a + b['exercises'], 0);

    return (
        <div>
            { parts.map(part => <Part key={ part.id } part={ part } />) }
            <p>yhteensä { total } tehtävää</p>
        </div>
    )
}
// print course part info
const Part = ({ part }) => {
    return (
        <p>{ part.name } { part.exercises }</p>
    )
}

export default Course
