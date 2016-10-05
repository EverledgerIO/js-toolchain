/**
 * Custom development server with hot reload functionality using Babel
 *
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-09-08
 * @flow
 */

const path = require('path');

const webpack = require('webpack');
const express = require('express');
const serveStatic = require('serve-static');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require("connect-history-api-fallback");

const topPath = path.join(__dirname, '../');
const staticPath = path.join(__dirname, './build/');

// read config
const {
  EXTERNAL_PORT,
  WEBPACK_CONFIG_FILE,
} = process.env;

const webpackConfig = require(path.resolve(process.cwd(), WEBPACK_CONFIG_FILE));

// init server (use express since the webpack middleware works on that)

const app = express();
const compiler = webpack(webpackConfig);

// route anything webpack or static dir doesn't handle via index file
app.use(historyApiFallback(null));

app.use(function(req, res, next) {
  if (!req.url.match(/^\/(__webpack_hmr|res\/|.*?\.(js|json|css|jpg|gif|png)$)/)) {
    req.url = '/';
  }
  next();
});

// webpack bindings
const pn = 'verbose'; // none, errors-only, minimal, normal, verbose
app.use(devMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  contentBase: webpackConfig.devServer.contentBase,
  historyApiFallback: webpackConfig.devServer.historyApiFallback,
  stats: {
    // @see https://github.com/webpack/docs/wiki/node.js-api#stats
    context: topPath,
    hash: false,
    version: false,
    timings: true,
    assets: true,
    entrypoints: pn === "verbose",
    chunks: true,
    chunkModules: true,
    modules: true,
    cached: false,
    children: true,
    warnings: true,
    errorDetails: true,
    reasons: true,
    usedExports: true,
    providedExports: true,
    colors: true,
  },
}));

app.use(hotMiddleware(compiler));

// pass through anything from the bundle dir directly
app.use(serveStatic(staticPath, {
  'index': false,
}));


// start!

app.listen(EXTERNAL_PORT, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening at http://localhost:${EXTERNAL_PORT}/`);
});
