'use strict'

const data = []

const findBook = (id) => {
    const books = data.filter(item => item.id === id)

    if (books.length > 0) {
        return books[0]
    }

    return null
}

const lastKey = () => {
    let id = null

    if (data.length > 0) {
        id = data[data.length - 1].id
    }

    return id
}

const generateKey = () => {
    const id = lastKey() !== null ? lastKey() + 1 : 1

    return id
}

module.exports = { generateKey, findBook, data }

