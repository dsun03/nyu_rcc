module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    semi: ['error', 'always'],
    'no-var': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    curly: ['error'],
    eqeqeq: ['error'],
    'no-multi-spaces': ['error'],
    'no-lone-blocks': ['error'],
    'no-self-compare': ['error'],
    'no-unused-expressions': ['error'],
    'no-useless-call': ['error'],
    'no-use-before-define': ['error'],
    camelcase: ['error', { properties: 'never' }],
    'func-call-spacing': ['error'],
    'no-lonely-if': ['error'],
    'array-bracket-spacing': ['error'],
    'no-console': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
