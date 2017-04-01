'use strict'

class Book {
    constructor(attributes) {
        this.title = attributes.title
        this.synopsis = attributes.synopsis
        this.author = attributes.author
        this.id = attributes.id
        this.vote = 0
    }

    setId(id) {
        this.id = id
    }

    downvote() {
        this.vote--
    }

    upvote() {
        this.vote++
    }
}

module.exports = Book

