import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Ошибки форматирования Prettier
      '@typescript-eslint/no-unused-vars': ['error'], // Проверка неиспользуемых переменных
      // '@typescript-eslint/no-unsafe-assignment': 'error', // Проверка unsafe-типов
      'react/react-in-jsx-scope': 'off', // Отключение правила для новых версий React
      'react/jsx-uses-react': 'off',
      'no-unused-vars': 'off',
    },
  },
];
