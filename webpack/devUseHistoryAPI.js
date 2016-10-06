/**
 * Enable history API fallback for the Webpack dev server
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const merge = require('webpack-partial/merge');

module.exports = merge({ devServer: { historyApiFallback: true } });
