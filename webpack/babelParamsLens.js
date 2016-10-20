/**
 * Lens for managing babel parameters via its `query` subelement
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-20
 * @flow
 */

const { compose, lensPath } = require('ramda');

const babelConfigLens = require('./babelConfigLens');

const babelParamsLens = compose(
  babelConfigLens,
  lensPath(['query'])
);

module.exports = babelParamsLens;
