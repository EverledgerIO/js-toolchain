/**
 * A curried function that concatenates an array from the object provided at
 * arg[1] at the key specified by arg[0].
 *
 * @see mergeArrayKey.js
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { concat } = require('ramda');

const mergeArrayKey = require('./mergeArrayKey');

module.exports = mergeArrayKey(concat);
