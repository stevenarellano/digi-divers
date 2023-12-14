module.exports = {
  root: true,
  extends: '@react-native-community',
  ignorePatterns: ['node_modules/*', 'js/*'],
  rules: {
    'prettier/prettier': 0,
    '@typescript-eslint/no-unused-vars': 'warn',
    'es-lint/comma-dangle': 'off',
    'no-alert': 'warn',
    'react/react-in-jsx-scope': 'off',
    'quotes': 'off',
  },
};
