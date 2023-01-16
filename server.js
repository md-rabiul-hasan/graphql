const express         = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const userData = require("./userData.json");

const app = express();

let fakeDb = {};

var schema = buildSchema(`
    type Person {
        id: Int,
        name: String,
        email: String
    }

    type Query {
        users: [Person]
        user(id: Int): Person,
        getMessage: String
    }

    type Mutation {
        addMessage(msg: String): String
    }
`);

var root = {
    users: () => userData,
    user: ({id}) => {
        return userData.find(user => user.id === id)
    },
    addMessage: ({ msg }) => (fakeDb.message = msg),
    getMessage: () => {
        return fakeDb.message
    }

}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(8000);

console.log('app is running')