/**
 * Sets the output path for compilation
 *
 * Also wires up the content base path for Webpack Devserver
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { curry, compose } = require('ramda');
const output = require('webpack-partial/output').default;
const merge = require('webpack-partial/merge').default;

module.exports = curry(folderPath => compose(
  output({ path: folderPath }),
  merge({ devServer: { contentBase: folderPath } })
));
