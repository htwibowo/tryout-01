'use strict'

const { buildSchema } = require('graphql')
const Book = require('./book')
const { findBook, data, generateKey } = require('./data')

const book1 = new Book({ title: 'Sample Book', synopsis: 'lorem ipsum', author: 'Harry Tri Wibowo' })
book1.setId(1)

const book2 = new Book({ title: 'Sample Book #2', synopsis: 'lorem ipsum', author: 'Harry Tri Wibowo' })
book2.setId(2)

const book3 = new Book({ title: 'Sample Book: The Trilogy', synopsis: 'lorem ipsum', author: 'Harry Tri Wibowo' })
book3.setId(3)

data.push(book1)
data.push(book2)
data.push(book3)

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
        // clone data to prevent structure changes because of array sort
        const sorted = data.slice(0)

        sorted.sort((itemA, itemB) => {
            if (itemA.vote < itemB.vote) {
                return 1
            } else if (itemA.vote > itemB.vote) {
                return -1
            }

            return 0
        })

        console.log(sorted)

        return sorted
    }
}

module.exports = { root, schema }

