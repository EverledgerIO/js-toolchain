/**
 * Mostly taken from `generator-javascript`
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-13
 * @flow
 */

const { curry } = require('ramda');
const os = require('os');
const path = require('path');
const del = require('del');
const async = require('rollup-plugin-async');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

function makeRollupConfig(pkg, destDir, entrypoint) {
  const extension = path.extname(entrypoint);
  const filename = path.basename(entrypoint, extension);

  return {
    entry: entrypoint,
    external: Object.keys(pkg.dependencies),
    plugins: [
      async(),
      babel(Object.assign({}, pkg.babel, {
        babelrc: false,
        exclude: [
          'node_modules/**',
          path.join(os.tmpdir(), '**'),
        ],
      })),
      nodeResolve({
        jsnext: true,
        main: true,
      }),
      commonjs({
        exclude: ['node_modules/**'],
      }),
    ],
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
