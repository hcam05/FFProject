import React from 'react';
import ReactDOM from 'react-dom';
import PlayerTable from './components/Player/PlayerTable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey800 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        textColor: grey800,
    },
    appBar: {
        height: 50,
    },

});

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <PlayerTable />
    </MuiThemeProvider>
    , 
    document.getElementById('mount'));