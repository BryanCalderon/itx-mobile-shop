import js from '@eslint/js'
import eslintReact from '@eslint-react/eslint-plugin'
import pluginQuery from '@tanstack/eslint-plugin-query'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y-x'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { oneComponentPerFile } from './eslint/rules/oneComponentPerFile.js'

/**
 * Layers, from top to bottom: app, pages, features, entities and the shared code (shared,
 * components and api). Each layer imports only from the layers below it, and features don't
 * import each other: pages compose them.
 */
const LAYER_RULES = [
  { files: ['src/pages/**'], forbidden: ['app'] },
  { files: ['src/features/**'], forbidden: ['app', 'pages', 'features'] },
  { files: ['src/entities/**'], forbidden: ['app', 'pages', 'features'] },
  {
    files: ['src/shared/**', 'src/components/**', 'src/api/**'],
    forbidden: ['app', 'pages', 'features', 'entities'],
  },
]

/** Modules import each other through the @/ alias instead of deep relative paths */
const deepRelativeImports = {
  group: ['../../../*'],
  message: 'Use the @/ alias to import from other modules.',
}

function restrictImports(forbiddenLayers = []) {
  return [
    'error',
    {
      patterns: [
        deepRelativeImports,
        ...forbiddenLayers.map((layer) => ({
          group: [`@/${layer}/*`],
          message: `This layer cannot import from ${layer}. See the layers in eslint.config.js.`,
        })),
      ],
    },
  ]
}

export default defineConfig(
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintReact.configs['recommended-type-checked'],
      jsxA11y.configs.recommended,
      pluginQuery.configs['flat/recommended'],
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        projectService: { allowDefaultProject: ['eslint.config.js', 'eslint/rules/*.js'] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      local: { rules: { 'one-component-per-file': oneComponentPerFile } },
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-deprecated': 'error',
      // One component per file
      'local/one-component-per-file': 'error',
      // Imports in a single block without blank lines: side effects, packages, @/ alias and relative
      'simple-import-sort/imports': ['error', { groups: [['^\\u0000', '^@?\\w', '^@/', '^\\.']] }],
      'simple-import-sort/exports': 'error',
      'no-restricted-imports': restrictImports(),
    },
  },
  ...LAYER_RULES.map(({ files, forbidden }) => ({
    files,
    // Tests wire several layers together, as the application does
    ignores: ['**/*.test.{ts,tsx}'],
    rules: { 'no-restricted-imports': restrictImports(forbidden) },
  })),
)
