import React from 'react';
import ReactDOM from 'react-dom';

const Hello = ({ name, age }) => {
    const bornYear = () => new Date().getFullYear() - age;

    return (
        <div>
            <p>Hello { name }, you are { age } years old. I am guessing you were born in { bornYear() }</p>
        </div>
    )
}

const Footer = () => {
    return (
        <div>
            gr33t0r app producors by <a href="https://pproto.pw/peetu">peetu</a>
        </div>
    )
}


const App = () => {
    const age = 200;
    const nimi = 'peksi'
    return (
        <>
            <h1>Greetings</h1>
            <Hello name="peetu" age={26 + 200} />
            <Hello name="harry" age={age} />
            <Hello name={nimi} age={age} />
            <Footer />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
