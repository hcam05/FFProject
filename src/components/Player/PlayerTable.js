import React from 'react';
import axios from 'axios';
import PlayerStats from './PlayerStats';

// GraphQL set up with react-apollo library
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
class PlayerTable extends React.Component {
  constructor() {
    super();
    this.state = {
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
        DEF: true
      },
    };
  };

  nextPg() {
    if (this.state.end < 99) {
      this.setState({
        start: this.state.start + 50,
        end: this.state.end + 50
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

  render() {
    console.log(this.props.weekStats);

    if (this.props.weekStats && this.props.weekStats.loading) return <div>Loading</div>;

    if (this.props.weekStats && this.props.weekStats.error) return <div>Error</div>;

    return (
      <div>
        <div>Fantasy Football Dashboard</div>
        <br />
          {(this.props.weekStats.week) ? <PlayerStats data={this.props.weekStats.week} start={this.state.start} end={this.state.end} key={this.props.weekStats.week[0].week} /> : <div>Loading</div>}
          <br />
        <button onClick={() => this.prevPg()}>Prev</button>
        <button onClick={() => this.nextPg()}>Next</button>
      </div>

    );
  }
}
//GRAPHQL QUERY
const query = gql`
{
week(week: 16, season: 2017){
    name
    team
    position
    weekPts
    seasonPts
    week
    season
    id
    }
}
`;

// module.exports = graphql(query)(NflTable);
export default graphql(query, { name: 'weekStats' })(PlayerTable);
