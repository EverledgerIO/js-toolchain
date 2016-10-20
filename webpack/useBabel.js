/**
 * Configure all necessary options to compile using Babel
 *
 * @see babelConfigLens.js
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { compose } = require('ramda');

const addEntrypoints = require('./addEntrypoints');

module.exports = compose(
  addEntrypoints('babel-polyfill')
);
