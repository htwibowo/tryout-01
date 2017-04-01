'use strict'

const app = require('./app')
const { schema, root } = require('./schema')
const graphqlHTTP = require('express-graphql')

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

app.listen(3000, '0.0.0.0')

