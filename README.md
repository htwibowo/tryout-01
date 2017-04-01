# Refactory - Try Out 01

This repository contains source codes for Refactory's Try Out 01, which includes:

## Generator - Yield

To run this program, go to `yield` directory and run `node index.js`.

## GraphQL

### How to run
**Server**
- Go to server directory of GraphQL using `cd graphql/server`
- If you just clone this repository, you have to install all dependencies using `yarn install` or `npm install`
- Run the server using `yarn start` or `npm start`

**React Native**
- Go to react native graph ql directory using `cd graphql/reactGraphQL`
- Build react native application using `react-native run-android`

**Data Schema**
```
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
```

**Sample Data**

This application contains sample data.
```JSON
{
  "data": {
    "books": [
      {
        "id": 1,
        "vote": 0,
        "synopsis": "lorem ipsum",
        "title": "Sample Book",
        "author": "Harry Tri Wibowo"
      },
      {
        "id": 2,
        "vote": 0,
        "synopsis": "lorem ipsum",
        "title": "Sample Book #2",
        "author": "Harry Tri Wibowo"
      },
      {
        "id": 3,
        "vote": 0,
        "synopsis": "lorem ipsum",
        "title": "Sample Book: The Trilogy",
        "author": "Harry Tri Wibowo"
      }
    ]
  }
}
```

## WebSocket

## License

MIT

## Footnote

This repository is maintained by Harry Tri Wibowo. You may contact me [by email](mail@htwibowo.co) or drop me a message [here](http://linkedin.com/in/htwibowo)

