/**
 * CSS build pipeline for development
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { compose } = require('ramda');
const webpack = require('webpack');
const loader = require('webpack-partial/loader').default;
const plugin = require('webpack-partial/plugin').default;
const postCSSModuleComponents = require('postcss-modules-component-plugin');

const { makePostCSSOptions } = require('../postcss-config');

const matchRegex = /\.(css|scss)$/;

module.exports = compose(
  loader({
    test: matchRegex,
    loaders: [
      { loader: 'style-loader' },
      { loader: postCSSModuleComponents.loader() },
      { loader: 'css-loader', query: { sourceMap: true, importLoaders: 1 } },
      { loader: 'postcss-loader' },
    ],
  }),
  plugin(new webpack.LoaderOptionsPlugin({
    test: matchRegex,
    options: { postcss: makePostCSSOptions() },
  }))
);
