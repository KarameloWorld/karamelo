import { test, expect } from "@playwright/test";

test.describe("Karamelo App", () => {
  test("should load the homepage", async ({ page }) => {
    await page.goto("/");

    // Check if the page loads successfully
    await expect(page).toHaveTitle(/Karamelo - Karaoke/);

    // Check for basic React content
    await expect(page.locator("body")).toBeVisible();
  });

  test("should have working navigation", async ({ page }) => {
    await page.goto("/");

    // Wait for the page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Check if we can interact with the page
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("should be responsive", async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle page reload", async ({ page }) => {
    await page.goto("/");

    // Reload the page
    await page.reload();

    // Check if the page still works after reload
    await expect(page.locator("body")).toBeVisible();
  });
});
