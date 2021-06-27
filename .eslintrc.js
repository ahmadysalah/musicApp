/*
 - Severity should be one of the following: [0 = off],[1 = warning],[2 = error] (you passed "3").
 - ESLint Documentation https://eslint.org/docs/user-guide/getting-started you can find information 
   about all of these rules
*/
module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react', 'eslint:recommended'],
  plugins: ['prettier', 'react', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  env: {
    es6: true,
    browser: true,
  },
  root: true,
  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'react/prop-types': 0,
    'no-return-assign': [2, 'except-parens'],
    'object-curly-newline': 0,
    'function-paren-newline': 0,
    'react/self-closing-comp': [
      2,
      {
        component: true,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'no-use-before-define': [2, { variables: false }],
    'arrow-body-style': [2, 'as-needed'],
    'prettier/prettier': [
      2,
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
        endOfLine: 'auto',
      },
    ],
    'react-hooks/rules-of-hooks': 2,
  },
};
