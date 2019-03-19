import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handler }) => {
    return (
        <button onClick={ handler }>
            { text }
        </button>
    )
}

const TopAnecdote = ({ anecdotes }) => {
    const getVotes = () => anecdotes.map(a => a.votes);
    const votes = getVotes();

    const topIndex = votes.reduce((a, b, c) => (b > votes[a] ? c : a ), 0);
    return (
        <div>
            <h1>Anecdote with the most votes</h1>
            <p>{ anecdotes[topIndex].text }</p>
            <p>has { anecdotes[topIndex].votes } votes</p>
        </div>
    )
}

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(0)

    const setRandom = () => {
        while (true) {
            var random = Math.floor(Math.random() * 6);
            // tarkistetaan ettei tule samaa anekdoottia uudestaan
            if (random !== selected) {
                setSelected(random);
                setVotes(anecdotes[random].votes);
                break;
            }
        }
    }

    const voteAnecdote = (selected) => {
        return (
            () => {
                anecdotes[selected].votes += 1;
                setVotes(anecdotes[selected].votes)
            }
        )
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{ anecdotes[selected].text }</p>
            <p>has { votes } votes</p>
            <Button handler={ setRandom } text='next anecdote' />
            <Button handler={ voteAnecdote(selected) } text='vote this' />
            <TopAnecdote anecdotes={ anecdotes } />
        </div>
    )
}

const anecdotes = [
    { text: 'If it hurts, do it more often', votes: 0 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 }
]


ReactDOM.render(<App anecdotes={ anecdotes } />, document.getElementById('root'))
