/**
 * Plugins for optimising the Webpack build
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { compose } = require('ramda');
const webpack = require('webpack');
const plugin = require('webpack-partial/plugin').default;

module.exports = compose(
  plugin(new webpack.optimize.OccurrenceOrderPlugin()),
  plugin(new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compress: {
      warnings: false,
    },
  }))
);
