const express         = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

var schema = buildSchema(`
    type Person {
        name: String,
        email: String
    }

    type Developer {
        profile: Person,
        experience: Int
    }

    type Query {
        name: String,
        developer: Developer
    }
`);

var root = {
    name: () => {
        return 'Rabiul Hasan'
    },
    developer: () => {
        return { profile: { name: "Rabiul Hasan", email: "rhasan.fci@gmail.com"}, experience: 3}
    }
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(8000);

console.log('app is running')

