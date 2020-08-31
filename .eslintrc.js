module.exports = {
  env: {
    es2020: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'no-console': 1,
    'no-unused-vars': 0
  }
}
