/**
 * Shared bundle for base PostCSS plugin settings for parsing styles
 *
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-08-26
 * @flow
 */

const fs = require('fs');
const path = require('path');

const syntax = require('postcss-scss');
const postcssModules = require('postcss-modules');
const partialImport = require('postcss-import');
const mixins = require('postcss-sassy-mixins');
const advancedVariables = require('postcss-advanced-variables');
const customMedia = require('postcss-custom-media');
const customProperties = require('postcss-custom-properties');
const mediaMinmax = require('postcss-media-minmax');
const colorFunctions = require('postcss-sass-color-functions');
const customFunctions = require('postcss-functions');
const nesting = require('postcss-nesting');
const nested = require('postcss-nested');
const customSelectors = require('postcss-custom-selectors');
const atroot = require('postcss-atroot');
const propertyLookup = require('postcss-property-lookup');
const extend = require('postcss-extend');
const selectorMatches = require('postcss-selector-matches');
const selectorNot = require('postcss-selector-not');
const stripInline = require('postcss-strip-inline-comments');
const stripMultiline = require('postcss-discard-comments');
const autoprefixer = require('autoprefixer');
const postCSSModuleComponents = require('postcss-modules-component-plugin');

const {
  EXTRA_SASS_FUNCS_FILE,
  SERVER_STATIC_PATH,
} = process.env;

const sassFunctions = EXTRA_SASS_FUNCS_FILE
  ? require(path.resolve(process.cwd(), EXTRA_SASS_FUNCS_FILE))
  : {};

const topDir = process.cwd();
const webBuildDir = path.join(topDir, SERVER_STATIC_PATH);


// init
postCSSModuleComponents.setGlobalModulesWhitelist([
  /\/node_modules\//,
  /src\/views\/buttons\/_buttonMixins\.scss$/,
  /src\/views\/spinners\/Spinner\.scss$/,
  /src\/stylekit\/_mixins\.scss$/,
]);


// helpers

function getCssMetaFileName(cssFileName) {
  return cssFileName.replace(topDir, '').replace(/\//g, '$').replace(/\.scss$/, '') + '.json';
}


// init plugins

const moduleLoaderPlugin = postcssModules({
  generateScopedName: function(name, filename, css) {
    const res = postCSSModuleComponents.scopedName(name, filename, css);
    return res;
  },
  getJSON: function(cssFileName, json) {
    fs.writeFileSync(path.join(webBuildDir, 'meta', getCssMetaFileName(cssFileName)), JSON.stringify(json));
    return postCSSModuleComponents.writer(cssFileName, json);
  },
});

function getPostCSSPlugins(webpack, format = null) {
  if (format) {
    postCSSModuleComponents.setLocalModuleNameFormat(format);
  }

  // :IMPORTANT: the order of this array will be the execution order of plugins!
  return [
    // Compile import dependency graph
    partialImport({
      extension: 'scss',
      addDependencyTo: webpack,
      plugins: [moduleLoaderPlugin],  // handle modules first so we can determine filename to handle global mode
    }),
    // handle modules after combining into partials in order to get final classnames
    moduleLoaderPlugin,
    mixins(),
    advancedVariables(),
    customMedia(),
    customProperties(),
    mediaMinmax(),
    nesting(),
    nested(),
    customSelectors(),
    atroot(),
    propertyLookup({ logLevel: 'warn' }),
    extend(),
    selectorMatches(),
    selectorNot(),
    customFunctions({ // MUST go after variable / mixin handling in order to receive final values
      functions: sassFunctions,
    }),
    colorFunctions(), // MUST go after `customFunctions` as the output from them is often used as input to color fns
    stripInline(),
    stripMultiline(),
    // Handle outdated browser compatibility
    autoprefixer({ browsers: ['last 2 versions'] }),
  ];
}


module.exports = {
  getPostCSSPlugins,
  syntax,
};
