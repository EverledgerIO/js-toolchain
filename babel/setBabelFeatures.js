/**
 * Apply Babel configurations to its nested object in the Webpack config
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { merge } = require('ramda');

module.exports = features => merge(features);
