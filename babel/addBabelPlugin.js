/**
 * Adds a plugin to Babel's configuration
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { curry } = require('ramda');

const concatArrayKey = require('../helpers/concatArrayKey');

module.exports = curry(plugins => concatArrayKey('plugins', [plugins]));
