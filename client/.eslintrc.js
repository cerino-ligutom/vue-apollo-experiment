module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // Before you pull your gun, there's a reason for this. See `component-0.vue`.
    '@typescript-eslint/ban-ts-comment': 'off',

    'implicit-arrow-linebreak': 'off',
  },
};
