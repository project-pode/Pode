module.exports = {
    'env': {
      'node': true,
      'commonjs': true,
      'es2021': true,
      'jest':true
    },
    'extends': 'eslint:recommended',
    'overrides': [
      {
        'env': {
          'node': true,
          'jest':true

        },
        'files': [
          '.eslintrc.{js,cjs}'
        ],
        'parserOptions': {
          'sourceType': 'script'
        }
      }
    ],
    'parserOptions': {
      'ecmaVersion': 'latest'
    },
    'rules': {
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error'
      ],
      'eqeqeq':'error',
      'no-trailing-spaces':'error',
      'object-curly-spacing':[
        'error','always'
      ],
      'arrow-spacing':[
        'error', { 'before':true, 'after':true }
      ],
      'no-console':0
    }
  };