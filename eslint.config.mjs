import nextPlugin from 'eslint-config-next';

const eslintConfig = [
  ...nextPlugin,
  {
    rules: {
      // This rule has false-positives for valid async data-fetching patterns.
      // setState is called after await (asynchronously), not synchronously in the effect.
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];

export default eslintConfig;
