import React from 'react';
import axios from 'axios';
import PlayerStats from './PlayerStats';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { green800, green500, grey800 } from 'material-ui/styles/colors';
import { Table } from 'material-ui/Table'
import { TableBody } from 'material-ui/Table/TableBody';

// GraphQL set up with react-apollo library
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey800,
  },
  appBar: {
    height: 50,
  },

});

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
  }

  prevPg() {
    if (this.state.start > 0) {
      this.setState({
        start: this.state.start - 50,
        end: this.state.end - 50,
      });
    }
  }

  render() {
    console.log(this.props.weekStats);

    if (this.props.weekStats && this.props.weekStats.loading) return <div>Loading</div>;

    if (this.props.weekStats && this.props.weekStats.error) return <div>Error</div>;

    return (
      <div>
        <AppBar title="Fantasy Football Dashboard " style={{ backgroundColor: green800 }}>
        </AppBar>
        <br />
        {(this.props.weekStats.week) ? <PlayerStats data={this.props.weekStats.week} start={this.state.start} end={this.state.end} key={this.props.weekStats.week[0].week}/> : <div>Loading</div>}
        <br />
        <RaisedButton onClick={() => this.prevPg()}>Prev</RaisedButton>
        <RaisedButton onClick={() => this.nextPg()}>Next</RaisedButton>
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
    }
}
`;

// module.exports = graphql(query)(NflTable);
export default graphql(query, { name: 'weekStats' })(PlayerTable);
