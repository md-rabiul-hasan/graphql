const resolvers = {
    Query: {
        async characters(_, __, { Character }) {
            return await Character.findAll();
        },

        async character(_, { id }, { Character }) {
            let character = await Character.findAll({
                where: {
                    id: id
                }
            });
            return character[0];
        },
        async characterDelete(_, { id }, { Character }) {
            let character = await Character.destroy({
                where: {
                    id: id
                }
            });
            if (character) {
                return {
                    deleted: true
                }
            }
            return {
                deleted: false
            }
        }
    },
    Mutation: {
        async addCharacter(_, { data }, { Character }) {
            let id = (await Character.count()) + 1;
            let character = {
                id,
                ...data
            }
            return await Character.create(character);
        },
        async updateCharacter(_, { id, data }, { Character }) {
            let character = await Character.update(data, {
                where: {
                  id: id
                }
              });
            return data;
        }
    }
}

module.exports = resolvers;