const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(((total, blog) => total + blog.likes), 0)
}

// returning the index of the blog with highest likes
const favouriteBlog = (blogs) => {
    let reducer = (acc, currVal, currIdx, arr) => (blogs[currIdx].likes >= blogs[acc].likes) ? acc = currIdx : acc = acc
    let reducedIndex = blogs.reduce(reducer, 0)

    let returnObject = {
        title: blogs[reducedIndex].title,
        author: blogs[reducedIndex].author,
        likes: blogs[reducedIndex].likes
    }
    return returnObject
}

const mostBlogs = (blogs) => {
    let authors = blogs.map(a => a.author)
    let authorsRemap = []
    authors.map(a => {
        if (authorsRemap.find(x => x.author === a) === undefined) {
            authorsRemap.push({ author: a, blogs: 1 })
        } else {
            let idx = authorsRemap.findIndex(z => z.author === a)
            authorsRemap[idx].blogs++
        }
    })
    const reducer = (acc, curr, index, arr) => (authorsRemap[index].blogs > authorsRemap[acc].blogs) ? acc = index : acc = acc
    let greatestIndex = authorsRemap.reduce(reducer, 0)

    return { author: authorsRemap[greatestIndex].author, blogs: authorsRemap[greatestIndex].blogs }
}

const mostLikes = (blogs) => {
    let authors = blogs.map(a => {
        return { author: a.author, likes: a.likes }
    })
    let authorLikes = []
    authors.map(author => {
        if (authorLikes.find(x => x.author === author.author) === undefined) {
            authorLikes.push({ author: author.author, likes: author.likes })
        } else {
            let findIndex = authorLikes.findIndex(c => c.author === author.author)
            authorLikes[findIndex].likes += author.likes
        }
    })
    let reducer = (acc, curr, index, arr) => (authorLikes[index].likes > authorLikes[acc].likes)? acc = index : acc = acc
    let greatestIndex = authorLikes.reduce(reducer, 0)

    return { author: authorLikes[greatestIndex].author, likes: authorLikes[greatestIndex].likes }
}


module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
