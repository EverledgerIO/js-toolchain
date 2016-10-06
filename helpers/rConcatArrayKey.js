/**
 * A curried function that concatenates an array from the object provided at
 * arg[1] at the key specified by arg[0] from right to left (instead of LTR)
 *
 * @see mergeArrayKey.js
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const rConcat = require('./rConcat');
const mergeArrayKey = require('./mergeArrayKey');

module.exports = mergeArrayKey(rConcat);
