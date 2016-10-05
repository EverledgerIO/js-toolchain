# Everledger JavaScript build toolchain

Various modules to assist with developing frontend applications.

<!-- MarkdownTOC -->

- [Modules list](#modules-list)

<!-- /MarkdownTOC -->


## Modules list

This repository contains only a singular exposed module, since various pieces of the build system can be tightly dependent on one another. Toplevel directories exist as entrypoints for other modules, so you *must* ensure that you do not rename them (except in the event of a breaking major version update). External code should require them as `@everledger/js-toolchain/devserver` and similar.

- `devserver`: An [Express](http://expressjs.com/) webserver which wraps Webpack for hot reloading during development, using Babel. This server uses Express instead of our usual Koa simply because that's what Webpack's dev middleware is built for. The server accepts the following environment variables:
	- `EXTERNAL_PORT`- the port it should listen on.
	- `WEBPACK_CONFIG_FILE`- path to configuration file to load for Webpack, relative to your project folder.
- `postcss-config`: Standard configuration for CSS compilation used in projects. This config ideally *does not* change from project to project- we will add support for other CSS preprocessors as needed such that our build system can basically digest anything we throw at it.
