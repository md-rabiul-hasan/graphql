const express         = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const userData = require("./userData.json");

const app = express();

let fakeDb = [
    { id: 1, name: "Office", rent: "$5" },
    { id: 2, name: "co-worker", rent: "$15" },
];

var schema = buildSchema(`
    type Person {
        id: Int,
        name: String,
        email: String
    }

    type Space {
        name: String
        rent: String
    }

    type Query {
        users: [Person]
        user(id: Int): Person,
        getMessage: String,
        getSpace(id: ID!): Space !
    }

    type Mutation {
        addMessage(msg: String): String,
        createSpace(name: String, rent: String): Space
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
    },
    createSpace: ({ name, rent}) => (fakeDb[fakeDb.length] = {id: 3, name:name, rent:rent }),
    getSpace: ({id}) => {
        console.log(fakeDb.find((space) => space.id == id));
        return fakeDb.find((space) => space.id === id)
    } 

}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(8000);

console.log('app is running')