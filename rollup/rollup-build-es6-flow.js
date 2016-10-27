/**
 * Mostly taken from `generator-javascript`
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-13
 * @flow
 */

const { curry } = require('ramda');
const path = require('path');
const del = require('del');
const babel = require('rollup-plugin-babel');

function makeRollupConfig(pkg, destDir, entrypoint) {
  const extension = path.extname(entrypoint);
  const filename = path.basename(entrypoint, extension);

  return {
    entry: entrypoint,
    external: Object.keys(pkg.dependencies),
    plugins: [babel(Object.assign(pkg.babel, {
      babelrc: false,
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      presets: pkg.babel.presets.map(x => (x === 'es2015' ? 'es2015-rollup' : x)),
    }))],
    targets: [
      {
        format: 'es',
        sourceMap: true,
        dest: path.resolve(destDir, `${filename}.es6.js`),
      },
      {
        format: 'cjs',
        sourceMap: true,
        dest: path.resolve(destDir, `${filename}.js`),
      },
    ],
  };
}

function cleanOutputDirectory(destDir) {
  return del([path.resolve(destDir, '*')]);
}

module.exports = {
  makeRollupConfig: curry(makeRollupConfig),
  cleanOutputDirectory,
};
