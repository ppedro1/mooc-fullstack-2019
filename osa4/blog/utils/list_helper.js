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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}
