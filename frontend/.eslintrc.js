module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    parser: "babel-eslint",
  },
  plugins: ["vue"],
  rules: {},
};
