import React from 'react';
import axios from 'axios';
import Player from './Player';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { green800, green500, grey800 } from 'material-ui/styles/colors';
import { Table } from 'material-ui/Table'
import { TableBody } from 'material-ui/Table/TableBody';

const muiTheme = getMuiTheme({
    palette: {
        textColor: grey800,
    },
    appBar: {
        height: 50,
    },

});

class PlayerStats extends React.Component {
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

    getData() {
        //connect to mongoDB
        //query for default year and default week
        //set state
        console.log('v2 fired');
        const url = `https://api.coinmarketcap.com/v1/ticker/`;
        axios.get(url).then(res => res.data.map(x => {
            this.setState({ crypto: res.data });
        }));
    }

    filter() {
        
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        return (
                <div>
                <AppBar title="CryptoCheck" style={{ backgroundColor: green800 }}>
                </AppBar>
                <br />
                <Coin data={this.state.crypto} start={this.state.start} end={this.state.end} />
                <br />
                <RaisedButton onClick={() => this.prevPg()}>Prev</RaisedButton>
                <RaisedButton onClick={() => this.nextPg()}>Next</RaisedButton>
                </div>
            
        );
    }
}
export default PlayerTable;
