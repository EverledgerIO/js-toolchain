/**
 * Configure all necessary options to compile using Babel
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { compose, concat, mergeWith } = require('ramda');
const loader = require('webpack-partial/loader').default;

const addEntrypoints = require('./addEntrypoints');

module.exports = babelSettings => compose(
  addEntrypoints('babel-polyfill'),
  loader({
    test: /\.jsx?$/,
    exclude: [/\/node_modules\//],
    loader: 'babel',
    query: mergeWith(concat, { presets: [], plugins: [] }, babelSettings),
  })
);
