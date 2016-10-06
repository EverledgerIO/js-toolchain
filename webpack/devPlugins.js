/**
 * Base Webpack plugins necessary for a streamlined development workflow
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { compose } = require('ramda');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const plugin = require('webpack-partial/plugin').default;

module.exports = compose(
  plugin(new webpack.HotModuleReplacementPlugin()), // inject modules after change
  plugin(new webpack.NamedModulesPlugin()),         // assists with debugging
  plugin(new webpack.NoErrorsPlugin()),             // suppress errors so Webpack doesn't exit
  plugin(new WebpackNotifierPlugin())               // show notification on Desktop when compilation completes / fails
);
