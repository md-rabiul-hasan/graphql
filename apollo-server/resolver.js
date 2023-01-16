const characterData = require('./harrypotter.json');
const resolvers = {
    Query: {
        humans() {
            return characterData.filter(character => !(character.species));
        },
        nonHumans() {
            return characterData.filter(character => character.species);
        }
    }
}

module.exports = resolvers;