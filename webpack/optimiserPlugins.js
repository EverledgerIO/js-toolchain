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
  plugin(new webpack.optimize.OccurrenceOrderPlugin())

  // :TODO: make this work with babel
  // @see https://github.com/webpack/webpack/issues/1659
  // @see https://github.com/boopathi/babili-webpack-plugin
  // plugin(new webpack.optimize.UglifyJsPlugin({
  //   comments: false,
  //   compress: {
  //     warnings: false,
  //   },
  // }))
);
