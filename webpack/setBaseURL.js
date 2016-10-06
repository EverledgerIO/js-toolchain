/**
 * Sets the base URL of the server so that all generated links are relative to it.
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const output = require('webpack-partial/output').default;

module.exports = baseURL => output({ publicPath: baseURL });
