const { ApolloServer } = require('apollo-server');

const types = require("./types");
const resolvers = require("./resolver");


const server = new ApolloServer({ typeDefs: types, resolvers });

server.listen()
    .then(({ url }) => {
        console.log("Server is running at " + url);
    })