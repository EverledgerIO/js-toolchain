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
const setBabelFeatures = require('../babel/setBabelFeatures');

module.exports = features => over(babelParamsLens, setBabelFeatures(features));
