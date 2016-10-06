/**
 * Array concatenation function which runs in reverse order.
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { concat, reverse } = require('ramda');

module.exports = (...args) => concat(...reverse(args));
