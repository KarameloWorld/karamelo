// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

import prettier from "eslint-plugin-prettier/recommended";
import next from "@next/eslint-plugin-next";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  next.flatConfig.recommended,
);
