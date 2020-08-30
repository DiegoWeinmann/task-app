module.exports = {
  env: {
    es2020: true,
    node: true
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
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-console': 1
  }
}
