// DEPENDENCIES //
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const app = express();
const mcache = require('memory-cache');

// GRAPHQL DEPENDENCIES //
const graphQLHTTP = require('express-graphql');
const schema = require('./graphql/schema');

// DATABASE CONNECTION
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nfl_api_data');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

//CACHE//
let cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key);

    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.end
      res.end = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next();
    }
  }
}

const compiler = webpack(webpackConfig);
 
app.use(express.static(__dirname + '/www'));

// GRAPHQL//
app.use('/graphql', graphQLHTTP({
  schema,
  graphiql: true,
}));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
 
const server = app.listen(9000, function() {
  const port = server.address().port;
  console.log(`Is it over ${port}?!?!`);
});