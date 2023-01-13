var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String,
    name: String
  }
`);

var rootValue  = {
    hello: () => {
        return 'Hello world!';
    },
    name: () => {
        return 'Rabiul Hasan'
    }
}

graphql({
    schema,
    source: '{ hello, name }',
    rootValue 
})
    .then((response) => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    })