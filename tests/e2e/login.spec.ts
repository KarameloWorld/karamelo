import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should display login form", async ({ page }) => {
    await expect(page.getByText("KaraMelo")).toBeVisible();
    await expect(page.getByText("Connexion Établissement")).toBeVisible();
    await expect(page.getByLabel("Email de l'établissement")).toBeVisible();
    await expect(page.getByLabel("Mot de passe")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Se connecter" }),
    ).toBeVisible();
  });

  test("should show karaoke features", async ({ page }) => {
    await expect(page.getByText("Gestion des chansons")).toBeVisible();
    await expect(page.getByText("Suivi des participants")).toBeVisible();
    await expect(page.getByText("🔑 Identifiants de test")).toBeVisible();
  });

  test("should toggle password visibility", async ({ page }) => {
    const passwordInput = page.getByLabel("Mot de passe");
    const toggleButton = page.getByRole("button", {
      name: "Afficher le mot de passe",
    });

    await expect(passwordInput).toHaveAttribute("type", "password");

    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("should handle successful login", async ({ page }) => {
    const emailInput = page.getByLabel("Email de l'établissement");
    const passwordInput = page.getByLabel("Mot de passe");
    const submitButton = page.getByRole("button", { name: "Se connecter" });

    await emailInput.fill("bar@karamelo.com");
    await passwordInput.fill("bar123");
    await submitButton.click();

    // Should show loading state
    await expect(page.getByText("Connexion...")).toBeVisible();
    await expect(submitButton).toBeDisabled();

    // Should redirect to dashboard
    await expect(page).toHaveURL("/");
  });

  test("should handle failed login", async ({ page }) => {
    const emailInput = page.getByLabel("Email de l'établissement");
    const passwordInput = page.getByLabel("Mot de passe");
    const submitButton = page.getByRole("button", { name: "Se connecter" });

    await emailInput.fill("wrong@email.com");
    await passwordInput.fill("wrongpassword");
    await submitButton.click();

    // Should show loading state
    await expect(page.getByText("Connexion...")).toBeVisible();

    // Should show error alert
    page.on("dialog", (dialog) => {
      expect(dialog.message()).toContain("Identifiants incorrects");
      dialog.accept();
    });

    await page.waitForTimeout(2100); // Wait for login process to complete
  });

  test("should handle remember me checkbox", async ({ page }) => {
    const checkbox = page.getByRole("checkbox");

    await expect(checkbox).not.toBeChecked();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
  });

  test("should be accessible", async ({ page }) => {
    // Check for proper headings
    await expect(
      page.getByRole("heading", { name: "Connexion Bar" }),
    ).toBeVisible();

    // Check for proper form labels
    await expect(page.getByLabel("Email de l'établissement")).toBeVisible();
    await expect(page.getByLabel("Mot de passe")).toBeVisible();

    // Check for proper button roles
    await expect(
      page.getByRole("button", { name: "Se connecter" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Afficher le mot de passe" }),
    ).toBeVisible();
  });

  test("should handle keyboard navigation", async ({ page }) => {
    // Tab through form elements
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Email de l'établissement")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Mot de passe")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button", { name: "Afficher le mot de passe" }),
    ).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("checkbox")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button", { name: "Se connecter" }),
    ).toBeFocused();
  });

  test("should handle form submission with Enter key", async ({ page }) => {
    const emailInput = page.getByLabel("Email de l'établissement");
    const passwordInput = page.getByLabel("Mot de passe");

    await emailInput.fill("bar@karamelo.com");
    await passwordInput.fill("bar123");
    await passwordInput.press("Enter");

    // Should show loading state
    await expect(page.getByText("Connexion...")).toBeVisible();

    // Should redirect to dashboard
    await expect(page).toHaveURL("/");
  });

  test("should persist login state", async ({ page, context }) => {
    const emailInput = page.getByLabel("Email de l'établissement");
    const passwordInput = page.getByLabel("Mot de passe");
    const submitButton = page.getByRole("button", { name: "Se connecter" });

    await emailInput.fill("bar@karamelo.com");
    await passwordInput.fill("bar123");
    await submitButton.click();

    // Wait for redirect
    await expect(page).toHaveURL("/");

    // Open new page in same context
    const newPage = await context.newPage();
    await newPage.goto("/");

    // Should remain logged in
    await expect(newPage).toHaveURL("/");
  });
});
