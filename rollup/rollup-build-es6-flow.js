/**
 * Mostly taken from `generator-javascript`
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-13
 * @flow
 */

const { curry } = require('ramda');
const fs = require('fs');
const path = require('path');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');

function runRollup(pkg, destDir, entrypoint) {
  let promise = Promise.resolve();

  const extension = path.extname(entrypoint);
  const filename = path.basename(entrypoint, extension);

  // Compile source code into a distributable format with Babel
  for (const format of ['es6', 'cjs']) {
    promise = promise.then(() => rollup.rollup({
      entry: entrypoint,
      external: Object.keys(pkg.dependencies),
      plugins: [babel(Object.assign(pkg.babel, {
        babelrc: false,
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        presets: pkg.babel.presets.map(x => (x === 'es2015' ? 'es2015-rollup' : x)),
      }))],
    }).then(bundle => bundle.write({
      dest: path.resolve(destDir, format === 'cjs' ? `${filename}.js` : `${filename}.${format}.js`),
      format,
      sourceMap: true,
      moduleName: format === 'umd' ? pkg.name : undefined,
    })));
  }

  return promise.catch(err => console.error(err, err.stack)); // eslint-disable-line no-console
}

function cleanOutputDirectory(destDir) {
  return del([path.resolve(destDir, '*')]);
}

module.exports = {
  compileES6Module: curry(runRollup),
  cleanOutputDirectory,
};
