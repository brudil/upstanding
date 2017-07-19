module.exports = {
  plugins: [
    'stylelint-selector-bem-pattern',
  ],
  rules: {
    'plugin/selector-bem-pattern': {
      preset: 'bem',
    },

    // color
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-named': 'never',
    'color-no-invalid-hex': true,

    // font family
    'font-family-name-quotes': 'always-where-recommended',

    // font weight
    'font-weight-notation': 'numeric',

    // function
    'function-calc-no-unspaced-operator': true,
    'function-comma-space-after': 'always',
    'function-comma-space-before': 'never',
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-parentheses-newline-inside': 'always-multi-line',
    'function-parentheses-space-inside': 'never',
    'function-url-quotes': 'always',
    'function-whitespace-after': 'always',

    // number
    'number-leading-zero': 'always',
    'number-max-precision': 3,
    'number-no-trailing-zeros': true,
    'length-zero-no-unit': true,

    // string
    'string-no-newline': true,
    'string-quotes': 'single',

    // Time
    'time-no-imperceptible': true,

    // unit
    'unit-case': 'lower',
    'unit-no-unknown': true,

    // value
    'value-no-vendor-prefix': true,

    // value list
    'value-keyword-case': 'lower',
    'value-list-comma-newline-before': 'never-multi-line',
    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never',

    'custom-property-no-outside-root': true,

    // property
    'property-case': 'lower',
    'property-no-vendor-prefix': true,

    // declaration
    'declaration-bang-space-after': 'never',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-no-important': true,

    // declaration block
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-ignored-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-properties-order': 'alphabetical',
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-semicolon-newline-before': 'never-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': 'always',

    // block
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always',
    'block-no-empty': true,
    'block-no-single-line': true,
    'block-opening-brace-newline-after': 'always',
    'at-rule-empty-line-before': 'never',
    'block-opening-brace-space-before': 'always',
    'comment-empty-line-before': ['always', {
      ignore: ['stylelint-commands'],
    }],
    indentation: 2,
    'max-nesting-depth': 3,
    'no-invalid-double-slash-comments': true,
    'rule-non-nested-empty-line-before': ['always', {
      ignore: ['after-comment'],
    }],
    'selector-list-comma-newline-after': 'always',
    'selector-no-id': true,

    'declaration-property-value-blacklist': {
      '/^border/': ['none'],
    },
  },
};

