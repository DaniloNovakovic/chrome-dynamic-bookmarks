import path from "path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    clearMocks: true,
    environment: "node",
    exclude: ["node_modules", "build", "e2e"],
    globals: false,
    include: ["src/**/*.test.{ts,tsx}", "src/**/*.integration.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      thresholds: {
        "src/background/requestHandlers/**": {
          branches: 15,
          functions: 30,
          lines: 30,
          statements: 30,
        },
        "src/shared/lib/browser/**": {
          branches: 15,
          functions: 25,
          lines: 25,
          statements: 25,
        },
      },
    },
  },
});
