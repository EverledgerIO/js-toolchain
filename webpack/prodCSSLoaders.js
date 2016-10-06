/**
 * CSS build pipeline for production mode
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const loader = require('webpack-partial/loader').default;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const postCSSModuleComponents = require('postcss-modules-component-plugin');

module.exports = loader({
  test: /\.(css|scss)$/,
  exclude: [/\/node_modules\//],
  loaders: [
    'style-loader',
    postCSSModuleComponents.loader(),  // use commonjs output mode for PostCSS modules instead of CSS module format
    ExtractTextPlugin.extract({
      // :IMPORTANT: do *not* use fallbackLoader, place your loaders prior to ExtractTextPlugin's
      fallbackLoader: [],
      // :IMPORTANT: you must specify loaders as strings here, as ExtractTextPlugin will break with objects
      loader: [
        'css-loader?sourceMap=true&importLoaders=1',
        'postcss-loader',
      ],
    }),
  ],
});
