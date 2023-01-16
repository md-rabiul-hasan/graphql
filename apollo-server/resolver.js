const characterData = require('./harrypotter.json');
const resolvers = {
    Character: {
        __resolveType(character, contextValue, info) {
            // Only Author has a name field
            if (character.species) {
                return 'NonHuman';
            }
            // Only Book has a title field
            if (!character.species) {
                return 'Human';
            }
            return null; // GraphQLError is thrown
        },
    },

    Query: {
        humans() {
            return characterData.filter(character => !(character.species));
        },
        nonHumans() {
            return characterData.filter(character => character.species);
        },
        characters() {
            return characterData;
        }
    }
}

module.exports = resolvers;