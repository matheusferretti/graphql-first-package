const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')
const app = express()

const authors = [
    { id: 1, name: "Cixin Liu"},
    { id: 2, name: "Walter Isaacson"},
    { id: 3, name: "Blake Crouch"}
]

const books = [
    {id: 1, name: "The Three Body Problem", authorId: 1},
    {id: 2, name: "The Dark Forest", authorId: 1},
    {id: 3, name: "Deaths End", authorId: 1},
    {id: 4, name: "Einstein", authorId: 2},
    {id: 5, name: "Innovators", authorId: 2},
    {id: 6, name: "Da Vinci", authorId: 2},
    {id: 7, name: "Recursion", authorId: 3},
    {id: 8, name: "Dark Matter", authorId: 3}
]

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a book written ny an author",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: () => books
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))
app.listen(5000., () => console.log('Server Running'))