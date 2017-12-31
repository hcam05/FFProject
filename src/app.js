import React from 'react';
import ReactDOM from 'react-dom';
import PlayerTable from './components/Player/PlayerTable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey800 } from 'material-ui/styles/colors';

//Apollo Client Depenedcies//
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:9000/graphql' }),
    cache: new InMemoryCache()
});


const muiTheme = getMuiTheme({
    palette: {
        textColor: grey800,
    },
    appBar: {
        height: 50,
    },

});

ReactDOM.render(
    <ApolloProvider client={client} >
        <MuiThemeProvider muiTheme={muiTheme}>
            <PlayerTable />
        </MuiThemeProvider>
    </ ApolloProvider>
    ,
    document.getElementById('mount'));