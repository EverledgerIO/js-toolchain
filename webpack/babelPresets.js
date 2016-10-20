/**
 *
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-20
 * @flow
 */

const { over } = require('ramda');

const babelParamsLens = require('./babelParamsLens');
const addBabelPresets = require('../babel/addBabelPresets');

module.exports = presets => over(babelParamsLens, addBabelPresets(presets));
