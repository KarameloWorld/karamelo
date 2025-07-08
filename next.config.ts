import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  env: {
    SENTRY_ENVIRONMENT:
      process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || "development",
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
};

// Sentry configuration - use environment variables
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options
  org: process.env.SENTRY_ORG || "karameloworld",
  project: process.env.SENTRY_PROJECT || "karamelo-front",
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: process.env.NODE_ENV === "production",

  // Enables automatic instrumentation of Vercel Cron Monitors
  automaticVercelMonitors: true,

  // Hide source maps from generated client bundles
  hideSourceMaps: true,

  // Disable Sentry during development if no DSN is provided
  dryRun:
    !process.env.NEXT_PUBLIC_SENTRY_DSN &&
    process.env.NODE_ENV === "development",
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
