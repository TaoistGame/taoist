module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser', 
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    semi: 'error',
    indent: ['error', 2], // two spaces, not more, no tabs
    quotes: ['error', 'single', { 'allowTemplateLiterals': true }],
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': 'error'
  },
};

