/**
 * Lens for safely managing babel sub-configuration within Webpack's
 *
 * Further reading:
 * ----------------
 * http://randycoulman.com/blog/2016/07/12/thinking-in-ramda-lenses/
 * http://randycoulman.com/blog/2016/07/05/thinking-in-ramda-immutability-and-arrays/
 * http://randycoulman.com/blog/2016/06/28/thinking-in-ramda-immutability-and-objects/
 * http://stackoverflow.com/questions/35538351/ramda-js-lens-for-deeply-nested-objects-with-nested-arrays-of-objects/35544228
 *
 * @package: Everledger JS Toolchain
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-10-20
 * @flow
 */

const {
  compose, pipe, find, findIndex,
  pathOr, propEq, defaultTo,
  lens, lensProp, lensPath,
  assocPath, update, append,
} = require('ramda');

// set a default for the configuration to create a starting point
const babelBaseConfig = defaultTo({
  test: /\.jsx?$/,
  exclude: [/\/node_modules\//],
  loader: 'babel',
  query: { presets: [], plugins: [] },
});

// filter helper to find the babel loader in Webpack's `loaders` array
const isBabelLoader = propEq('loader', 'babel');

// toplevel lens to retrieve loaders or provide an empty array
const loadersLens = lens(
  pathOr([], ['module', 'loaders']),
  assocPath(['module', 'loaders'])
);

// sublens to access the babel loader config, provide a default & update it
const babelLens = lens(
  pipe(find(isBabelLoader), babelBaseConfig),
  (val, data) => {
    const index = findIndex(isBabelLoader, data);
    return index !== -1 ? update(index, val, data) : append(val, babelBaseConfig(data));
  }
);

// compose together to create the full pipeline
const babelConfigLens = compose(
  loadersLens,
  babelLens
);

module.exports = babelConfigLens;
