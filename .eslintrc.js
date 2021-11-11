module.exports = {
  root: true,

  extends: ['standard', 'plugin:vue/recommended'],

  env: {
    node: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  overrides: [
    {
      files: 'tests/**/*',
      rules: {
        // Disable no-undefined rule for Jest tests because `describe()`, `test()`
        // are methods available under the global NodeJS namespace.
        'no-undef': 'off',
      },
    },
  ],

  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    'vue/no-v-html': 'off',
  },
};
