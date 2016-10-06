/**
 * Add some Babel presets to its existing set
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { curry } = require('ramda');

const concatArrayKey = require('../helpers/concatArrayKey');

module.exports = curry(presets => concatArrayKey('presets', presets));
