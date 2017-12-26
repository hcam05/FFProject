const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    id: Number,
    name: String,
    position: String,
    team: String,
    seasonPts: Number,
    weekPts: Number,
    season: Number,
    week: Number,
    yrWkId: { type: String, index: { unique: true }},
})

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;