# Everledger JavaScript build toolchain

Various modules to assist with developing frontend applications.

<!-- MarkdownTOC -->

- [Modules list](#modules-list)
	- [Internal use](#internal-use)
- [Usage & examples](#usage--examples)
- [To do](#to-do)

<!-- /MarkdownTOC -->


## Modules list

This repository contains only a singular exposed module, since various pieces of the build system can be tightly dependent on one another. Toplevel directories exist as entrypoints for other modules, so you *must* ensure that you do not rename them (except in the event of a breaking major version update). External code should require them as `@everledger/js-toolchain/devserver` and similar.

- `devserver`: An [Express](http://expressjs.com/) webserver which wraps Webpack for hot reloading during development, using Babel. This server uses Express instead of our usual Koa simply because that's what Webpack's dev middleware is built for. The server accepts the following environment variables:
	- `EXTERNAL_PORT`- the port it should listen on.
	- `WEBPACK_CONFIG_FILE`- path to configuration file to load for Webpack, relative to your project folder.
- `postcss-config`: Standard configuration for CSS compilation used in projects. This config ideally *does not* change from project to project- we will add support for other CSS preprocessors as needed such that our build system can basically digest anything we throw at it.
- `webpack`: Contains composable helper functions for generating webpack configuration objects. See the main `webpack-config-helpers.js` file for the available imports.
- `babel`: Contains composable helper functions for generating Babel configuration objects. Not usually used directly (though this may be a thing in future)- imported by the `webpack` helpers in order to build the `babel-loader`'s `query` object.

### Internal use

- The `helpers` folder contains some higher-order functional helpers used in various parts of the framework. These shouldn't be used outside of this module.

## Usage & examples

For more examples and expected usage of these helpers, see the `boilerplate-frontend` repository.


## To do

- Update `postcss-import` to latest version. @see https://github.com/webpack/webpack/issues/2411#issuecomment-247132992
- LESS compilation, native SASS compilation & W3C CSS compilation modes via PostCSS (if needed)
- Break up CSS loader behaviours into smaller composable elements
- Remove environment variables from `postcss-config.js` and `devserver.js` in favour of conversion to composable functions
- Attempt keeping all Webpack loader modules within this repo and passing them to the parent project using `require.resolve()`
