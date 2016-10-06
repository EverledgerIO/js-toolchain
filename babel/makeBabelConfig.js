/**
 * Generate a Babel configuration object (or querystring, by Webpack's terminology)
 * by applying a series of composable functions to generate it.
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { compose } = require('ramda');

module.exports = (...generators) => compose(...generators)({});
