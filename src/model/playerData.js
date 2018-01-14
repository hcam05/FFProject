'use strict';
const isofetch = require('isomorphic-fetch');

const playerData = (season, wkNum) => {
  const allPlayers = []
  const nflApiUrlSeason = `http://api.fantasy.nfl.com/v1/players/stats?statType=weekStats&season=${this.state.year}&week=${this.state.week}&format=json`;
  console.log(`getting data ${nflApiUrlSeason}`);
  fetch(nflApiUrlSeason)
    .then((resp) => resp.json())
    .then((data) => {
      data.players.forEach((x) => {
        const plyr = {};
        plyr.id = x.id;
        plyr.name = x.name;
        plyr.position = x.position;
        plyr.team = x.teamAbbr;
        plyr.seasonPts = x.seasonPts;
        plyr.weekPts = x.weekPts;
        plyr.season = this.state.season;
        plyr.week = this.state.week;
        plyr.yrWkId = this.state.season + '' + this.state.week + '' + x.id;
        allPlayers.push(plyr);
      })
      console.log(`in setstate`);
      this.setState({
        players: allPlayers
      });
    })
}

module.exports = playerData;
