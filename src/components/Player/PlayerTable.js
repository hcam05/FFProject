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
      players: [],
      start: 0,
      end: 9,
      year: 2017,
      week: 15,
    };
  };

  nextPg() {
    if (this.state.end < 99) {
      this.setState({
        start: this.state.start + 10,
        end: this.state.end + 10
      });
    }
  }

  prevPg() {
    if (this.state.start > 0) {
      this.setState({
        start: this.state.start - 10,
        end: this.state.end - 10
      });
    }
  }

  render() {
    console.log(this.props);

    return (
      <div>
        <AppBar title="FFApp" style={{ backgroundColor: green800 }}>
        </AppBar>
        <br />
        {(this.props.data.loading) ? <div>Loading</div> : <PlayerStats data={this.props.data.week} start={this.state.start} end={this.state.end} />}
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
week(week: 16){
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
export default graphql(query)(PlayerTable);
