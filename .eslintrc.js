module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb-base'],
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  rules: {
    'no-use-before-define': 'error',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'error',
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'no-nested-ternary': 'off',
    'react/display-name': 'off',
  },
  globals: {
    fetch: true,
  },
};
