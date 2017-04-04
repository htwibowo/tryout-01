'use strict'

import config from '../config.js'

class BookService {
    constructor() {
        this.all = async () => {
            const responses = await fetch(config.endPoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/graphql' },
                body: `{ books { id title author vote } }`,
            })

            return JSON.parse(responses._bodyText).data.books
        }

        this.upvote = async (id) => {
            const responses = await fetch(config.endPoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/graphql' },
                body: `mutation { upvote(id: ${id}) }`,
            })

            return await this.all()
        }

        this.downvote = async (id) => {
            const responses = await fetch(config.endPoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/graphql' },
                body: `mutation { downvote(id: ${id}) }`,
            })

            return await this.all()
        }

        this.addNew = async () => {
            const responses = await fetch(config.endPoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/graphql' },
                body: `mutation { newBook( title: "Buku Baru" author: "Penulis Buku" synopsis: "Buku ini ditulis sedemikian rupa sehingga menjadi baru" ) }`,
            })

            return await this.all()
        }
    }
}

const service = new BookService()

export default service

