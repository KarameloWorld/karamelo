/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import * as path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    include: [
      "src/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "src/**/__tests__/**/*.{js,ts,jsx,tsx}",
    ],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/tests/e2e/**",
      "**/playwright-report/**",
      "**/test-results/**",
      "**/coverage/**",
      "**/.next/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/",
        "src/test/",
        "tests/e2e/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/coverage/**",
        "**/dist/**",
        "**/playwright-report/**",
        "**/test-results/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/src/components/ui/**", // Exclure les composants shadcn/ui
        "src/app/layout.tsx",
        "src/app/page.tsx",
        "**/.next/**",
      ],
      thresholds: {
        lines: 12,
        branches: 50,
        functions: 21,
        statements: 12,
      },
    },
  },
});
