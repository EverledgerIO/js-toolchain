/**
 * Sourcemap type for production builds
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const merge = require('webpack-partial/merge');

module.exports = merge({
  devtool: 'source-map',
});
