'use strict'

const { buildSchema } = require('graphql')
const Book = require('./book')
const { findBook, data, generateKey } = require('./data')

const schema = buildSchema(`
    type Mutation {
        upvote(id: Int): Boolean!
        downvote(id: Int): Boolean!
        newBook(title: String, author: String, synopsis: String): Int!
    }

    type Query {
        book(id: Int): Book
        books: [Book]
    }

    type Book {
        id: Int!
        title: String!
        synopsis: String
        author: String
        vote: Int
    }
`)

const root = {
    upvote({id}) {
        const book = findBook(id)

        if (book) {
            book.upvote()

            return true
        }

        return false
    },

    downvote({id}) {
        const book = findBook(id)

        if (book) {
            book.downvote()

            return true
        }

        return false
    },

    newBook(attributes) {
        const id = generateKey()

        const book = new Book(attributes)
        book.setId(id)

        data.push(book)

        return id
    },

    book(id) {
        return findBook(id)
    },

    books() {
        return data
    }
}

module.exports = { root, schema }

