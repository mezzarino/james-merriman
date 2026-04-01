// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import tailwind from "eslint-plugin-tailwindcss";
import prettier from "eslint-plugin-prettier";

export default [
  // ✅ Must be first
  {
    ignores: ["dist/**", "build/**", "node_modules/**", ".next/**"],
  },

  // ✅ Tailwind config must be treated as Node code
  {
    files: ["tailwind.config.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // ✅ allow process.env
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },

  // ✅ Main config
  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser, // ✅ window, document, etc.
        ...globals.node, // ✅ allows process for Next.js
        JSX: true, // ✅ enables React JSX globals
        React: true, // ✅ prevents React undefined errors
      },
    },

    // ✅ Register plugins properly
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": ts,
      tailwindcss: tailwind, // ✅ MUST BE NAMED tailwindcss
      prettier,
    },

    // ✅ Recommended configs (Flat Config compatible)
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...ts.configs.recommended.rules,

      // ✅ Tailwind Flat Config
      ...tailwind.configs["flat/recommended"].rules,

      // ✅ Prettier conflict resolution
      "prettier/prettier": "error",

      // ✅ React 17+
      "react/react-in-jsx-scope": "off",
    },

    settings: {
      react: { version: "detect" },
    },
  },
];
