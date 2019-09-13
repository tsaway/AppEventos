module.exports = {
    parser: 'babel-eslint',
    env: {
        es6: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier', 'react', 'jsx-ally', 'import'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off',
        camelcase: 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.js', '.jsx'],
            },
        ],
        'global-require': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
        'no-use-before-define': [
            'error',
            { functions: true, classes: true, variables: false },
        ],
    },
};
