const { gql } = require('apollo-server');

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

module.exports = types;