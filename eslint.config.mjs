// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import tailwind from "eslint-plugin-tailwindcss";
import prettier from "eslint-plugin-prettier";

// ✅ New plugins
import unicorn from "eslint-plugin-unicorn";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import validateFilename from "eslint-plugin-validate-filename";

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
        ...globals.node,
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
        ...globals.browser,
        ...globals.node,
        JSX: true,
        React: true,
      },

      // ✅ Needed so eslint-plugin-import resolves TS paths
      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    // ✅ Register plugins
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": ts,
      tailwindcss: tailwind,
      prettier,

      // ✅ New plugins
      unicorn,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
      "simple-import-sort": simpleImportSort,
      "validate-filename": validateFilename,
    },

    rules: {
      // ✅ ESLint Recommended
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...ts.configs.recommended.rules,

      // ✅ Tailwind
      ...tailwind.configs["flat/recommended"].rules,

      // ✅ Prettier
      "prettier/prettier": "error",

      // ✅ React
      "react/react-in-jsx-scope": "off",

      // ✅ Unicorn (modern best practices)
      "unicorn/prefer-top-level-await": "warn",
      "unicorn/no-useless-undefined": "warn",
      "unicorn/no-array-callback-reference": "warn",
      "unicorn/explicit-length-check": "warn",

      // ✅ Import plugin (resolution + hygiene)
      "import/no-unresolved": "error",
      "import/no-duplicates": "warn",
      "import/no-named-as-default-member": "off", // TS-friendly

      // ✅ Import sorting (simple + predictable)
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",

      // ✅ Accessibility checks
      ...jsxA11y.configs.recommended.rules,

      "validate-filename/naming-rules": [
        "error",
        {
          rules: [
            //
            // ✅ 1. Components → PascalCase
            //
            {
              case: "pascal",
              target: "src/components/**",
            },

            //
            // ✅ 2. Hooks → camelCase + must start with "use"
            //
            {
              case: "camel",
              target: "src/hooks/**",
              patterns: "^use",
            },

            //
            // ✅ 3. Providers → camelCase + end in "Provider"
            //
            {
              case: "camel",
              target: "src/providers/**",
              patterns: "^[a-zA-Z]*Provider",
            },

            //
            // ✅ 4. API Routes → kebab-case
            // e.g. /src/app/api/send-email/route.ts
            //
            {
              case: "kebab",
              target: "src/app/api/**",
            },

            //
            // ✅ 5. Next.js App Router Special Files → kebab-case
            // e.g. page.tsx, layout.tsx, template.tsx, loading.tsx, error.tsx, not-found.tsx, route.ts
            //
            {
              case: "kebab",
              target: "src/app/**",
              patterns:
                "^(page|layout|loading|error|not-found|route|template|metadata|default)\\.(ts|tsx)$",
            },

            //
            // ✅ 6. Server Actions → camelCase
            // e.g. src/actions/createPost.ts
            //
            {
              case: "camel",
              target: "src/actions/**",
            },

            //
            // ✅ 7. All other files → kebab-case
            // fallback rule for anything not caught above
            //
            {
              case: "kebab",
              target: "src/**",
            },
          ],
        },
      ],
    },

    settings: {
      react: { version: "detect" },
      // ✅ TS import resolver config
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
];
