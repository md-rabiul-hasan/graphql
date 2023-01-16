const { ApolloServer, gql } = require('apollo-server');
const characterData = require('./harrypotter.json');


const types = gql`
    type Wand {
        wood: String !
        core: String !
        length: Float
    }
    
    enum GENDER {
        male
        female
    }

    type Character {
        id: ID
        name: String
        gender: GENDER
        dateOfBirth: String
        actor: String
        wand: Wand
        image: String
    }

    type Query {
        characters: [Character]
    }
`;

const resolvers = {
    Query: {
        characters() {
            return characterData;
        }
    }
}

const server = new ApolloServer({ typeDefs: types, resolvers });

server.listen()
    .then(({url}) => {
        console.log("Server is running at "+ url);
    })