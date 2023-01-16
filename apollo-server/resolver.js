const characterData = require('./db/harrypotter.json');
const wands         = require('./db/wands.json');

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

    Human: {
        wand(parent) {
            return wands.find( (item) => parseInt(item.character_id) === parseInt(parent.id))
        }
    },
    Wand: {
        length(parent) {
            return parent.length ?? 0;
        }
    },
    
    Query: {
        humans(parent) {
            return characterData.filter(character => !(character.species));
        },
        human(_, {id}) {
            return characterData.find(item => parseInt(item.id) === parseInt(id));
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