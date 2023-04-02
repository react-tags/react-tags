module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "react",
    "import",
    "jsx-a11y",
    "@typescript-eslint",
    "react-hooks",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    indent: ["error", 2, { "SwitchCase": 1 }],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
  }
};
