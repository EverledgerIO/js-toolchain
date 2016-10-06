/**
 * Configure Webpack to compile an index.html file from some template
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const plugin = require('webpack-partial/plugin').default;

module.exports = indexFilePath => plugin(new HtmlWebpackPlugin({ template: indexFilePath }));
