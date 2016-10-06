/**
 * CSS build pipeline for development
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { compose } = require('ramda');
const loader = require('webpack-partial/loader').default;
const merge = require('webpack-partial/merge').default;
const postCSSModuleComponents = require('postcss-modules-component-plugin');

const { syntax, getPostCSSPlugins } = require('../postcss-config');

module.exports = compose(
  loader({
    test: /\.(css|scss)$/,
    exclude: [/\/node_modules\//],
    loaders: [
      { loader: 'style-loader' },
      { loader: postCSSModuleComponents.loader() },
      { loader: 'css-loader', query: { sourceMap: true, importLoaders: 1 } },
      { loader: 'postcss-loader' },
    ],
  }),
  merge({
    postcss: function(webpack) {
      return {
        plugins: getPostCSSPlugins(webpack),
        syntax: syntax,
      };
    },
  })
);
