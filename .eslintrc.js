module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    amd: true,
    node: true
  },
  plugins: ["simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended" // Make sure this is always the last element in the array.
  ],
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "simple-import-sort/sort": "error",
    "@typescript-eslint/no-explicit-any": "off"
  }
};
