/**
 * Merge in `entry` array to a webpack config
 *
 * @see withEntry.js
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { curry, concat, reverse, mergeWith } = require('ramda');

const rConcat = (...args) => concat(...reverse(args));

module.exports = curry(entryFile => mergeWith(
  rConcat,
  { entry: Array.isArray(entryFile) ? entryFile : [entryFile] }
));
