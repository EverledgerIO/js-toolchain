/**
 * Sourcemap type for development mode
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const merge = require('webpack-partial/merge').default;

module.exports = merge({
  devtool: 'eval-source-map',
});
