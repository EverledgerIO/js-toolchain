/**
 * Merge in `entry` array to a webpack config
 *
 * :WARNING: the order in which you apply multiple calls to this method matters!
 * Webpack is rather particular about the order of entrypoints.
 * We do the concatenation in reverse so that entries added later come last, which
 * means the final (app-specific) entrypoint can be added in the dependant project
 * after all the core entrypoints have been injected in shared configs.
 *
 * @see withEntry.js
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

const { curry } = require('ramda');

const rConcatArrayKey = require('../helpers/rConcatArrayKey');

module.exports = curry(entryFile => rConcatArrayKey('entry', entryFile));
