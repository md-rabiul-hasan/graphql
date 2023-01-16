const { gql } = require('apollo-server');

const types = gql`

interface Character {
    id: ID!
    name: String
    gender: GENDER
}

type Wand {
    wood: String !
    core: String !
    length: Float
}

enum GENDER {
    male
    female
}

type Human implements Character {
    id: ID!
    name: String
    gender: GENDER
    dateOfBirth: String
    actor: String
    wand: Wand
    image: String
}

type NonHuman implements Character {
    id: ID!
    name: String
    gender: GENDER
    species: String
}

type Query {
    humans: [Human]
    human(id: Int!): Human
    nonHumans: [NonHuman]
    characters: [Character!]!
}
`;

module.exports = types;