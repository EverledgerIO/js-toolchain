/**
 * Main export for Webpack configuration builder helpers
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-06
 * @flow
 */

// Load in dependencies
const webpack = require('webpack');
const output = require('webpack-partial/output').default;
const merge = require('webpack-partial/merge').default;
const loader = require('webpack-partial/loader').default;
const plugin = require('webpack-partial/plugin').default;
const tap = require('webpack-partial/tap').default;
const { compose } = require('ramda');

// A debug helper for use in dependant projects when testing configs
const debug = tap((config) => {
  console.log('WEBPACK CONFIG:');
  console.log(require('util').inspect(config, { depth: null, colors: true }));
  console.log('');
  process.exit();
});

// Load in low-level configuration components
const setOutputPath = require('./setOutputPath');
const setBundleFilename = require('./setBundleFilename');
const setBaseURL = require('./setBaseURL');
const setStandardResolveConfig = require('./setStandardResolveConfig');
const addEntrypoints = require('./addEntrypoints');
const compileIndexFile = require('./compileIndexFile');

const jsonLoader = require('./jsonLoader');
const assetLoader = require('./assetLoader');

const useBabel = require('./useBabel');
const makeBabelConfig = require('../babel/makeBabelConfig');
const setBabelFeatures = require('../babel/setBabelFeatures');
const addBabelPresets = require('../babel/addBabelPresets');
const addBabelPlugin = require('../babel/addBabelPlugin');

const devSourcemaps = require('./devSourcemaps');
const devUseHistoryAPI = require('./devUseHistoryAPI');
const devCSSLoaders = require('./devCSSLoaders');
const devPlugins = require('./devPlugins');

const prodSourcemaps = require('./prodSourcemaps');
const prodCSSLoaders = require('./prodCSSLoaders');
const compileCSSSeparately = require('./compileCSSSeparately');
const optimiserPlugins = require('./optimiserPlugins');

// Compose them into most common higher-level configurations
const baseBabelConfig = [
  // JSX & ES7
  addBabelPresets(["es2015", "react", "stage-0"]),
  // Flowtype
  addBabelPlugin("transform-flow-strip-types"),
];

const baseDevConfig = compose(
  setStandardResolveConfig,
  setBundleFilename('bundle.js'),
  devSourcemaps,
  devUseHistoryAPI,
  jsonLoader,
  assetLoader,
  devCSSLoaders,
  devPlugins,
  useBabel(makeBabelConfig(
    ...baseBabelConfig.concat([
      // enable caching while developing to speed up compilation
      setBabelFeatures({
        cacheDirectory: true,
      }),
      // auto-apply HMR functionality to React components
      addBabelPlugin("react-hot-loader/babel"),
      addBabelPlugin(["react-transform", {
        "transforms": [{
          "transform": "react-transform-hmr",
          "imports": ["react"], // :NOTE: if you use React Native, pass "react-native" instead
          "locals": ["module"], // :IMPORTANT:
        }, {
      // assist with React render() debugging
          "transform": "react-transform-catch-errors",
          "imports": [
            "react",  // :NOTE: if you use React Native, pass "react-native" instead
            "redbox-react", // React component to render error
          ],
        }],
      }]),
      // ES7 async / await runtime with extra stack trace info for debugging
      addBabelPlugin(["fast-async", {
        "env": {
          "asyncStackTrace": true,
        },
        "runtimePattern": "directive",  // requires "use runtime-nodent" at start of entrypoint file
      }]),
    ])
  )),
  // enable HMR functionality in the build
  addEntrypoints(['react-hot-loader/patch', require.resolve('webpack-hot-middleware/client')])
);

const baseProdConfig = compose(
  setStandardResolveConfig,
  setBundleFilename('[name]-[hash].js'),
  compileCSSSeparately('[name]-[hash].css'),    // required for `prodCSSLoaders` to work as expected
  prodSourcemaps,
  jsonLoader,
  assetLoader,
  prodCSSLoaders,
  optimiserPlugins,
  useBabel(makeBabelConfig(
    ...baseBabelConfig.concat([
      // disable caching to ensure we always have the latest code being compiled, even in weird conditions
      setBabelFeatures({
        cacheDirectory: false,
      }),
      // ES7 async / await runtime, fastest mode (no detailed stack traces)
      addBabelPlugin(["fast-async", {
        "env": {
          "asyncStackTrace": true,
        },
        "runtimePattern": "directive",  // requires "use runtime-nodent" at start of entrypoint file
      }]),
    ])
  ))
);

// Export for use in dependant projects
module.exports = {
  webpack,
  compose,
  debug,

  tap,
  loader,
  plugin,
  merge,
  output,

  setOutputPath,
  setBundleFilename,
  setBaseURL,
  setStandardResolveConfig,
  addEntrypoints,
  compileIndexFile,

  jsonLoader,
  assetLoader,

  useBabel,
  makeBabelConfig,
  setBabelFeatures,
  addBabelPresets,
  addBabelPlugin,

  devSourcemaps,
  devUseHistoryAPI,
  devCSSLoaders,
  devPlugins,

  prodSourcemaps,
  prodCSSLoaders,
  compileCSSSeparately,
  optimiserPlugins,

  baseDevConfig,
  baseProdConfig,
};
