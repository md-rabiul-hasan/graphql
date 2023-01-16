const { buildSchema, graphql } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();


let fakeDb = [
    { id: 1, name: "office", rent: "$25", status: "available" },
    { id: 2, name: "co-working", rent: "$10", status: "not_available" },
];


const schema = buildSchema(`
    type Space {
        name: String
        rent: String
        status: String
    }

    type Query {
        getSpace(id:ID!): Space !
    }

    enum SpaceStatus {
        available
        not_available
    }

    input SpaceInput {
        name: String
        rent: String
        status: SpaceStatus
    }

    type Mutation {
        crateSpace(input: SpaceInput) : Space !
    }

`);


const root = {
    getSpace: ({id}) => {
        return fakeDb.find((space) => parseInt(space.id) === parseInt(id))
    },
    crateSpace: ({input}) => {
        fakeDb[fakeDb.length] = {
            id: fakeDb.length,
            name:input.name,
            rent: input.rent,
            status: input.status
        }
        return input;
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