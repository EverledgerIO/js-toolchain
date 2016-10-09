/**
 * Configures standard resolve configuration
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-09
 * @flow
 */

const merge = require('webpack-partial/merge').default;

module.exports = merge({ resolve: { extensions:
  [".web.jsx", ".web.js", ".jsx", ".js", ".json"],
} });
