const characterData = require('./harrypotter.json');
const resolvers = {
    Query: {
        characters() {
            return characterData;
        }
    }
}

module.exports = resolvers;