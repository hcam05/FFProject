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
    description: 'Fantasy Football Player',
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
        season: {
            type: GraphQLInt,
            description: 'Season (ie. 2017)'
        },
        week: {
            type: GraphQLInt,
            description: 'Week of the season (ie. 1,2,3)'
        },
        yrWkId: {
            type: GraphQLInt,
            description: 'Unique Id which is a combination of Year, Week, and Player Id'
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
            type: new GraphQLList(PlayerType),
            args: {
                name: { type: GraphQLString },
                season: { type: GraphQLInt }
            },
            resolve: (root, { name, season }, _, fieldASTs) => {
                let result = [];
                return new Promise((resolve, reject) => {
                    Player.find({ "name": name, "season": season })
                        .sort({ 'week': 1 })
                        .exec()
                        .then(data => {
                            data.forEach((x) => {
                                result.push(x);
                                resolve(result);
                            });
                        })
                        .catch(errors => reject(errors))
                })
            }
        },
        team: {
            type: new GraphQLList(PlayerType),
            args: {
                team: { type: GraphQLString },
                season: { type: GraphQLInt },
                week: { type: GraphQLInt },
            },
            resolve: (root, { team, season, week }) => {
                return new Promise((resolve, reject) => {
                    Player.find({ "team": team, "season": season, "week": week })
                        .sort({ 'weekPts': -1 })
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
                position: { type: GraphQLString },
                season: { type: GraphQLInt },
            },
            resolve: (root, { position, season }) => {
                return new Promise((resolve, reject) => {
                    Player.find({ "position": position, "season": season, "week": week })
                        .sort({ 'weekPts': -1 })
                        .exec()
                        .then(data => {
                            resolve(data.filter((x) => x.weekPts > 0));
                        })
                        .catch(errors => reject(errors))
                })
            }
        },
        season: {
            type: new GraphQLList(PlayerType),
            args: {
                season: { type: GraphQLInt }
            },
            resolve: (root, { season }) => {
                return new Promise((resolve, reject) => {
                    Player.find({ "season": season })
                        .sort({ 'weekPts': -1 })
                        .exec()
                        .then(data => {
                            resolve(data.filter((x) => x.weekPts > 0));
                        })
                        .catch(errors => reject(errors))
                })
            }
        },
        week: {
            type: new GraphQLList(PlayerType),
            args: {
                week: { type: GraphQLInt }
            },
            resolve: (root, { week }) => {
                return new Promise((resolve, reject) => {
                    Player.find({ "week": week })
                        .sort({ 'weekPts': -1 })
                        .exec()
                        .then(data => {
                            resolve(data.filter((x) => x.weekPts > 0));
                        })
                        .catch(errors => reject(errors))
                })
            }
        },
        yrWkId: {
            type: PlayerType,
            args: {
                yrWkId: { type: GraphQLInt }
            },
            resolve: (root, { yrWkId }) => {
                return new Promise((resolve, reject) => {
                    Player.find({ "yrWkId": yrWkId })
                        .sort({ 'weekPts': -1 })
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
                    Player.find({ 'position': ['WR', 'QB', 'TE', 'RB', 'DEF'], 'weekPts': { $gt: '0' }, 'season': { season } })
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
