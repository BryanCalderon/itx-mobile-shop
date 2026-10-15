import js from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig(globalIgnores(['dist', 'coverage']), {
  files: ['**/*.{js,ts,tsx}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    jsxA11y.flatConfigs.recommended,
    pluginQuery.configs['flat/recommended'],
    prettier,
  ],
  languageOptions: {
    ecmaVersion: 2023,
    globals: globals.browser,
    parserOptions: {
      projectService: { allowDefaultProject: ['eslint.config.js'] },
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: { react, 'simple-import-sort': simpleImportSort },
  settings: { react: { version: 'detect' } },
  rules: {
    '@typescript-eslint/no-deprecated': 'error',
    // One component per file
    'react/no-multi-comp': 'error',
    // Imports in a single block without blank lines: side effects, packages, @/ alias and relative
    'simple-import-sort/imports': ['error', { groups: [['^\\u0000', '^@?\\w', '^@/', '^\\.']] }],
    'simple-import-sort/exports': 'error',
    // Modules import each other through the @/ alias instead of deep relative paths
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          { group: ['../../../*'], message: 'Use the @/ alias to import from other modules.' },
        ],
      },
    ],
  },
})
