const { gql } = require("apollo-server");

const types = gql`
    enum GENDER {
        male
        female
    }

    type Character {
        id         : ID!
        name       : String
        gender     : GENDER
        dateOfBirth: String
        actor      : String
        image      : String
        species    : String
    }

    type Delete {
        deleted: Boolean
    }

    type Query {
        characters: [Character]
        character(id: Int!): Character
        characterDelete(id: Int!): Delete
    }

    input CharacterInput {
        name       : String!
        gender     : GENDER!
        dateOfBirth: String
        actor      : String
        image      : String
        species    : String
    }

    type Mutation {
        addCharacter(data: CharacterInput): Character
        updateCharacter(id:Int!, data: CharacterInput): Character
    }
`;

module.exports = types;