/**
 * Generates a curried function which combines data from its final object
 * into the provided `key` using a `merger` function.
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { mergeWith, curry } = require('ramda');

module.exports = curry((merger, key, data) => mergeWith(
  merger, { [key]: Array.isArray(data) ? data : [data] }
));
