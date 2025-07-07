// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set environment from CI/CD pipeline
  environment:
    process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || "development",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === "development",

  // Session replay sampling
  replaysSessionSampleRate: process.env.NODE_ENV === "production" ? 0.01 : 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Release tracking
  release: process.env.SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA,

  // Additional tags
  initialScope: {
    tags: {
      component: "server",
      deployment: process.env.SENTRY_ENVIRONMENT || "unknown",
    },
  },

  // Disable Sentry if no DSN is provided
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
});
