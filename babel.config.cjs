module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  /**
   * Enable babel to transpile only fuzzify package for jest and
   * ignore rest of the node_modules.
   */
  ignore: ['/node_modules/(?!fuzzify)/'],
};
