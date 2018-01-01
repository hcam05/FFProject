'use strict';
// DEPENDENCIES
const isofetch = require('isomorphic-fetch');
const Player = require('./playerModel'); // Player Model for DB

// DATABASE CONNECTION
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nfl_api_data');
mongoose.connection.once('useMongoClient', () => {
    console.log('Connected to Database');
});

// NFL API
const nflApiUrl = 'http://api.fantasy.nfl.com/v1/players/stats?statType=weekStats&season=2017&week=12&format=json';
let season = '2017';

const getNflApiData = (season) => {
    for (let wkNum = 1; wkNum <= 16; wkNum += 1) {
        const nflApiUrlSeason = `http://api.fantasy.nfl.com/v1/players/stats?statType=weekStats&season=${season}&week=${wkNum}&format=json`;
        fetch(nflApiUrlSeason)
            .then((resp) => resp.json())
            .then((data) => {
                data.players.forEach((x) => {
                    const plyr = new Player(x);
                    plyr.id = x.id;
                    plyr.name = x.name;
                    plyr.position = x.position;
                    plyr.team = x.teamAbbr;
                    plyr.seasonPts = x.seasonPts;
                    plyr.weekPts = x.weekPts;
                    plyr.season = season;
                    plyr.week = wkNum;
                    plyr.yrWkId = season + '' + wkNum + '' + x.id;
                    plyr.save()
                        .then(() => {
                            console.log('saved in DB');
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
            })
            .then(mongoose.disconnect((res) => console.log('connection closed')))
            .catch((err) => console.log(err));
    }
    
}

getNflApiData(season);

module.exports = getNflApiData;
