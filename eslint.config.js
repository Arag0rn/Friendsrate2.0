import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';


export default [
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        browser: true,
        node: true,
      },
      parser: parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      typescript,
    },
    rules: {

      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {

    },
  },
  {
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  },

];