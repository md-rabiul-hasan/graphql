const { buildSchema , graphql } = require('graphql');
const express                   = require('express');
const { graphqlHTTP }           = require('express-graphql');

const app = express();

let fakeDb = [
    {id: 1, name: 'Rabiul Hasan', designation: "Backend Developer"},
    {id: 2, name: 'Monir Hossain', designation: "Frontend Developer"},
];

const schema = buildSchema(`
    type Space {
        name: String
        designation: String
    }

    type Query {
        getSpace(id:ID!): Space !
    }

    input SpaceInput {
        name: String
        designation: String
    }

    type Mutation {
        createSpace(input: SpaceInput): Space !
        updateSpace(id:ID!, input: SpaceInput): Space !
    }
`);

const root = {
    createSpace: ({ input }) => (
        fakeDb[fakeDb.length] = {id: fakeDb.length, name: input.name, designation:input.designation }
    ),
    getSpace:({id}) => {
        console.log(fakeDb)
        return fakeDb.find((space) => parseInt(space.id) === parseInt(id))
    },
    updateSpace: ({ id, input }) => {
        const index = parseInt(id) - 1;
        fakeDb[index] = { id, name:input.name, designation:input.designation};
        console.log(fakeDb)
        return fakeDb[index];
    }
}

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)


app.listen(8000);

