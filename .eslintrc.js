/*
    "off" or 0 - turn the rule off
    "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
*/

module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "6",
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react", "jsx-a11y"],
  "parser": "babel-eslint",
  rules: {
    "indent": [2, 2],
    "linebreak-style": [2, "unix"],
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "eqeqeq": [2, "smart"],
    "no-unused-vars": 1,
    "no-undef": 1,
    "default-case": 1,
    "comma-dangle": [2, "always-multiline"],
    "no-trailing-spaces": 2,
    "no-extra-bind": 1,
    "no-useless-escape": 1,

    /** react rules start here **/

    "react/jsx-no-duplicate-props": 2,
    "react/no-deprecated": 1,
    "react/no-is-mounted": 2,
    "react/no-unknown-property": 1,
    "react/prop-types": 2,
    "react/no-direct-mutation-state": 2,
    "react/jsx-key": 2,
    "react/no-children-prop": 1,
    "react/display-name": 1,
    "react/no-multi-comp": 1,
    "react/sort-comp": 1,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-typos": 2,
    "react/jsx-equals-spacing": 2,
    "react/jsx-no-undef": 2,
    "react/jsx-uses-vars": 1,
    "react/no-find-dom-node": 1,
    "react/no-render-return-value": 1,

    /** jsx-ally rules start here **/
    "jsx-a11y/alt-text": 2,
    "jsx-a11y/html-has-lang": 1,
    "jsx-a11y/iframe-has-title": 1,
    "jsx-a11y/click-events-have-key-events": 1
  },
  overrides: [
    {
      files: [
        "**/*.test.js"
      ],
      env: {
        jest: true // now **/*.test.js files' env has both es6 *and* jest
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      plugins: ["jest"],
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn"
      }
    }
  ],
};
