module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2015,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
