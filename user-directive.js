const { buildSchema, graphql } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const userData = require("./user.json");

const app = express();

const schema = buildSchema(`
    type Person {
        id: Int!
        name: String
        email: String
        pet: String
        petName: String
    }

    type Query {
        users: [Person],
        user(id:Int!):Person
    }
`);


const root = {
    users: () => {
        return userData;
    },
    user: ({ id }) => {
        return userData.find((user) => parseInt(user.id) === parseInt(id))
    }
}

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);


app.listen(8000);