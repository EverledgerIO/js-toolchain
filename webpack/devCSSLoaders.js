/**
 * CSS build pipeline for development
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const loader = require('webpack-partial/loader').default;
const postCSSModuleComponents = require('postcss-modules-component-plugin');

module.exports = loader({
  test: /\.(css|scss)$/,
  exclude: [/\/node_modules\//],
  loaders: [
    { loader: 'style-loader' },
    { loader: postCSSModuleComponents.loader() },
    { loader: 'css-loader', query: { sourceMap: true, importLoaders: 1 } },
    { loader: 'postcss-loader' },
  ],
});
