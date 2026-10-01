import js from '@eslint/js'
import babelParser from '@babel/eslint-parser'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// @babel/eslint-parser 附帶的 scopeManager 與 ESLint 10 不相容，
// 只取它產生的 AST，scope 分析交回 ESLint 自己做
const tsBabelParser = {
  meta: { name: 'babel-ts-ast-only' },
  parseForESLint(code, options) {
    const { ast, visitorKeys } = babelParser.parseForESLint(code, options)
    return { ast, visitorKeys }
  },
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  // TS / TSX：只檢查 React Hooks 規則，型別與未定義變數交給 tsc
  // （typescript-eslint 尚不支援 TypeScript 7，所以用 Babel 解析 TS 語法）
  {
    files: ['**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      parser: tsBabelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-typescript', '@babel/preset-react'],
        },
      },
      globals: globals.browser,
    },
  },
])
