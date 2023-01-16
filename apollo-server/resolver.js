

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
        wand(parent, __, {wands}) {
            return wands.find((item) => parseInt(item.character_id) === parseInt(parent.id))
        }
    },
    Wand: {
        length(parent) {
            return parent.length ?? 0;
        }
    },

    Query: {
        humans(_, __, { characters }) {
            return characters.filter(character => !(character.species));
        },
        human(_, { id }, { characters }) {
            return characters.find(item => parseInt(item.id) === parseInt(id));
        },
        nonHumans(_, __, { characters }) {
            return characters.filter(character => character.species);
        },
        characters(_, __, { characters }) {
            return characters;
        }
    },

    Mutation: {
        addCharacter(_, {data}, {characters}) {
            let character = {id: characters.length + 1, ...data};
            characters.push(character);
            return data;
        }
    }
}

module.exports = resolvers;