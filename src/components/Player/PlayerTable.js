import React from 'react';
import axios from 'axios';
import PlayerStats from './PlayerStats';
import PlayerControl from './PlayerControl';

class PlayerTable extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [],
      start: 0,
      end: 49,
      year: 2017,
      week: 16,
      positions: {
        QB: true,
        RB: true,
        WR: true,
        TE: true,
        K: true,
        DEF: true,
        LB: true,
        DB: true,
        DL: true,
      },
      showAll: false,
    };
  };

  componentDidMount() {
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

  nextPg() {
    if (this.state.end < this.state.players.length - 1) {
      this.setState({
        start: this.state.start + 50,
        end: (this.state.end + 50 > this.state.players.length - 1 ? this.state.players.length - 1 : this.state.end + 50)
      });
    }
  };

  prevPg() {
    if (this.state.start > 0) {
      this.setState({
        start: this.state.start - 50,
        end: this.state.end - 50,
      });
    }
  };

  showAll() {
    if (this.state.showAll === false) {
      this.setState({
        start: 0,
        end: this.state.players.length - 1,
        showAll: true,
      })
    } else {
      this.setState({
        start: 0,
        end: 49,
        showAll: false,
      })
    }
  }

  filterTable(pos) {
    //take text of button and filters
    console.log(`filter func: ${pos}`);
    console.log(this.state.positions);
    // if(this.state.positions.pos === true){
    //   this.setState({positions.pos: false})
    // }else{
    //   this.setState({positions.pos: true});
    // }
  }

  render() {

    if (this.state.players.length < 1) return <div>Loading</div>;

    return (
      <div>
        <div>Fantasy Football Dashboard</div>
        <div>
          <button onClick={() => this.showAll()}>Show All</button>
        </div>
        <div>
          <PlayerControl filterTable={(pos) => this.filterTable(pos)} />
        </div>
        <br />
        <PlayerStats data={this.state.players} start={this.state.start} end={this.state.end} />
        <br />
        <button onClick={() => this.prevPg()}>Prev</button>
        <button onClick={() => this.nextPg()}>Next</button>
      </div>

    );
  }
}

export default PlayerTable;
