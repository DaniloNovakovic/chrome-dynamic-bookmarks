module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ["eslint:recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
  },
};
