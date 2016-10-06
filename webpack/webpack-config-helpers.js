/**
 * Main export for Webpack configuration builder helpers
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

// Setup a module system hook so that `npm link`ed modules can resolve their dependencies correctly
require('@pospi/appcore/hooks/node-setGlobalIncludePath')(module);

// Load in dependencies
const webpack = require('webpack');
const tap = require('webpack-partial/tap').default;
const { compose } = require('ramda');

// A debug helper for use in dependant projects when testing configs
const debug = tap((config) => {
  console.log('WEBPACK CONFIG:');
  console.log(require('util').inspect(config, { depth: null, colors: true }));
  console.log('');
  // process.exit();
});

// Load in low-level configuration components
const setOutputPath = require('./setOutputPath');
const addEntrypoints = require('./addEntrypoints');

const useBabel = require('./useBabel');
const makeBabelConfig = require('../babel/makeBabelConfig');
const setBabelFeatures = require('../babel/setBabelFeatures');
const addBabelPresets = require('../babel/addBabelPresets');
const addBabelPlugin = require('../babel/addBabelPlugin');

const devSourcemaps = require('./devSourcemaps');
const devUseHistoryAPI = require('./devUseHistoryAPI');

const prodSourcemaps = require('./prodSourcemaps');

// Compose them into most common higher-level configurations
const baseDevConfig = compose(
  devSourcemaps,
  devUseHistoryAPI,
  useBabel(makeBabelConfig(
    setBabelFeatures({
      cacheDirectory: true,
    }),
    addBabelPresets(["es2015", "react", "stage-0"]),
    addBabelPlugin("transform-flow-strip-types")
  ))
);

const baseProdConfig = compose(
  prodSourcemaps,
  useBabel(makeBabelConfig(
    setBabelFeatures({
      cacheDirectory: false,
    })
  ))
);

// Export for use in dependant projects
module.exports = {
  webpack,
  compose,
  debug,

  setOutputPath,
  addEntrypoints,

  useBabel,
  makeBabelConfig,
  setBabelFeatures,
  addBabelPresets,
  addBabelPlugin,

  devSourcemaps,
  devUseHistoryAPI,

  prodSourcemaps,

  baseDevConfig,
  baseProdConfig,
};
