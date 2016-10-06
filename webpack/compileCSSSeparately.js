/**
 * Configure Webpack to compile the CSS to a separate file (for production)
 *
 * You must use `extract-text-webpack-plugin` (usually via `prodCSSLoaders.js`)
 * in order for this to have any effect.
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const plugin = require('webpack-partial/plugin').default;

module.exports = filename => plugin(new ExtractTextPlugin({ filename }));
