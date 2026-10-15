import js from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
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
  rules: {
    '@typescript-eslint/no-deprecated': 'error',
  },
})
