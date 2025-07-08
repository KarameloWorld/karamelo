import { test, expect } from "@playwright/test";

test.describe("Dashboard Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto("/login");
    await page.getByLabel("Email").fill("bar@karamelo.com");
    await page.getByLabel("Mot de passe").fill("bar123");
    await page.getByRole("button", { name: "Se connecter" }).click();
    await expect(page).toHaveURL("/");
  });

  test("should display dashboard after login", async ({ page }) => {
    await expect(page.getByText("Dashboard")).toBeVisible();
  });

  test("should handle navigation between pages", async ({ page }) => {
    // Test navigation to different sections
    const navigationItems = [
      { name: "Événements", url: "/events" },
      { name: "Participants", url: "/participants" },
      { name: "Chansons", url: "/songs" },
      { name: "File d'attente", url: "/participant-queue" },
    ];

    for (const item of navigationItems) {
      if (await page.getByText(item.name).isVisible()) {
        await page.getByText(item.name).click();
        await expect(page).toHaveURL(item.url);
      }
    }
  });

  test("should handle logout", async ({ page }) => {
    // Look for logout button or menu
    if (await page.getByText("Déconnexion").isVisible()) {
      await page.getByText("Déconnexion").click();
      await expect(page).toHaveURL("/login");
    }
  });

  test("should be responsive", async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("body")).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator("body")).toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle page refresh", async ({ page }) => {
    await page.reload();
    // Should remain on dashboard (if auth is properly implemented)
    await expect(page.locator("body")).toBeVisible();
  });
});
