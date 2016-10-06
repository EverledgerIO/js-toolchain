/**
 * Binary asset loader for Webpack
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const loader = require('webpack-partial/loader').default;

module.exports = loader({
  loader: 'url-loader?limit=50000',
  test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/,
});
