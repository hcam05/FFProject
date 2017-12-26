const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const Player = require('../../model/playerModel');

//Player Type
const PlayerType = new GraphQLObjectType({
    name: "Player",
    description: 'Name of Fantasy Player',
    fields: () => ({
        team: {
            type: GraphQLString,
            description: 'Player team name',
        },
        id: {
            type: GraphQLString,
            description: 'Player ID #'
        },
        name: {
            type: GraphQLString,
            description: 'Name of Player'
        },
        position: {
            type: GraphQLString,
            description: 'Player position',
        },
        seasonPts: {
            type: GraphQLFloat,
            description: 'Total points this season'
        },
        weekPts: {
            type: GraphQLFloat,
            description: 'Total points this week'
        },
        teammates: {
            type: new GraphQLList(PlayerType),
            description: 'List of Teammates',
            resolve: ({ name, team }) => {
                return new Promise((resolve, reject) => {
                    Player.find({ "team": team })
                        .exec()
                        .then(data => {
                            resolve(data.filter((x) => (x.name !== name && x.weekPts > 0)))
                        })
                        .catch(errors => reject(errors))
                })
            }
        }
    })
})

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPlayer: {
            type: PlayerType,
            args: {
                team: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Player team name',
                },
                id: {
                    type: GraphQLInt,
                    description: 'Player ID #'
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Name of Player'
                },
                position: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Player position',
                },
                seasonPts: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    description: 'Total points this season'
                },
                weekPts: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    description: 'Total points this week'
                }
            },
            resolve: (root, args) => {
                console.log('add player here')
                // if (Player.findOne(!{ 'name': name })){
                const plyr = new Player(args);
                plyr.save()
                // }
            }
        },
        deletePlayer: {
            type: PlayerType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Name of Player'
                }
            },
            resolve: (root, { name }) => {
                Player.find({ "name": name })
                    .remove()
                    .exec()
            }
        }
    }
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: '...',

    fields: () => ({
        player: {
            type: PlayerType,
            args: {
                name: { type: GraphQLString }
            },
            resolve: (root, { name }, _, fieldASTs) => {
                return new Promise((resolve, reject) => {
                    // console.log(`name: ${name}`);
                    Player.find({ "name": name })
                        .exec()
                        .then(data => {
                            // console.log(data);
                            data.forEach((x) => resolve(x));
                        })
                        .catch(errors => reject(errors))
                })
            }
        },
        team: {
            type: new GraphQLList(PlayerType),
            args: {
                team: { type: GraphQLString }
            },
            resolve: (root, { team }) => {
                return new Promise((resolve, reject) => {
                    Player.find({ "team": team })
                        .exec()
                        .then(data => {
                            resolve(data);
                        })
                        .catch(errors => reject(errors))
                })
            }
        },
        position: {
            type: new GraphQLList(PlayerType),
            args: {
                position: { type: GraphQLString }
            },
            resolve: (root, { position }) => {
                return new Promise((resolve, reject) => {
                    Player.find({ "position": position })
                        .exec()
                        .then(data => {
                            resolve(data.filter((x) => x.weekPts > 0));
                        })
                        .catch(errors => reject(errors))
                })
            }
        },
        all: {
            type: new GraphQLList(PlayerType),
            args: {
                all: { type: GraphQLString }
            },
            resolve: (root, args) => {
                return new Promise((resolve, reject) => {
                    Player.find({ 'position': ['WR', 'QB', 'TE', 'RB', 'DEF'], 'weekPts': { $gt: '0' } })
                        .sort({ 'weekPts': -1 })
                        .exec()
                        .then(data => {
                            resolve(data.filter((x) => x.weekPts > 0));
                        })
                        .catch(errors => reject(errors))
                })
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
