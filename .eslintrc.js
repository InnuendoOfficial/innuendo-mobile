module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  overrides: [
    {
      files: ['*.jsx', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
      },
    },
  ],
};