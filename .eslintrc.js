module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  globals: {
    document: true,
    window: true,
    process: true,
    describe: true,
    expect: true,
    it: true,
    beforeEach: true,
    afterEach: true,
    jest: true,
    cy: true, // Used with http://cypress.io
    atob: true,
    grecaptcha: true,
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],

    // Not a problem allowing multiple jsx expressions on a line
    // eg. <div>Welcome {user.name}</div>
    'react/jsx-one-expression-per-line': 'off',

    // We want to allow the backend to return underscore separated vars
    camelcase: 'off',

    // With nextjs, you wrap an empty anchor with a nextjs Link component.
    'jsx-a11y/anchor-is-valid': 'off',

    // When you have only a single item to export, fine to not default export it.
    'import/prefer-default-export': 'off',

    // Allow class components when no state.
    'react/prefer-stateless-function': 'true',

    // GraphQL uses underscore dangle, eg. __typename
    'no-underscore-dangle': 'off',

    // We want to keep commas on last items in arrays, objects, etc
    'comma-dangle': 2,

    // enforce single quotes
    quotes: 2,

    // discourage single line if statements
    curly: [2, 'all'],

    // Allow components connected with redux export as default
    'import/no-named-as-default': 'off',

    // We want to be able to export members individually as well as by default
    // (See the services/http.js module)
    'import/no-named-as-default-member': 'off',

    // Allow modules to be imported from devDependencies in stories and tests.
    'import/no-extraneous-dependencies': 'off',

    // Disable a11y warnings. TODO: review a11y
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',

    // We want to be able to add prop types as static class vars
    'react/static-property-placement': 'off',

    // We want to be able to initialise state inside and outside the constructor
    'react/state-in-constructor': 'off',

    // I want to use async on promise executors
    'no-async-promise-executor': 'off',

    'prefer-object-spread': 'off',

    'import/extensions': 0,
    'import/no-unresolved': 0,
    'linebreak-style': 0,
    'no-lonely-if': 0,
    'no-use-before-define': 0,
    'no-console': 0,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
