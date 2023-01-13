const express         = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

var schema = buildSchema(`
    type Query {
        name: String
    }
`);

var root = {
    name: () => {
        return 'Rabiul Hasan'
    }
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(8000);

console.log('app is running')

