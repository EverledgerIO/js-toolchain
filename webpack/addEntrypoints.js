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

const { curry } = require('ramda');

const rConcatArrayKey = require('../helpers/rConcatArrayKey');

module.exports = curry(entryFile => rConcatArrayKey('entry', entryFile));
