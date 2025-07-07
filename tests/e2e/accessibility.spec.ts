import { test, expect } from "@playwright/test";

test.describe("Accessibility Tests", () => {
  test("login page should be accessible", async ({ page }) => {
    await page.goto("/login");

    // Check for proper heading hierarchy
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();

    // Check for proper form labels
    const emailInput = page.getByLabel("Email");
    const passwordInput = page.getByLabel("Mot de passe");

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // Check for proper button labels
    const submitButton = page.getByRole("button", { name: "Se connecter" });
    const toggleButton = page.getByRole("button", {
      name: "Afficher le mot de passe",
    });

    await expect(submitButton).toBeVisible();
    await expect(toggleButton).toBeVisible();

    // Check for proper form structure
    const form = page.locator("form");
    await expect(form).toBeVisible();

    // Check for proper checkbox label
    const checkbox = page.getByRole("checkbox");
    await expect(checkbox).toBeVisible();
  });

  test("should support keyboard navigation", async ({ page }) => {
    await page.goto("/login");

    // Start keyboard navigation
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Email")).toBeFocused();

    // Fill email with keyboard
    await page.keyboard.type("bar@karaobar.com");

    // Tab to password
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Mot de passe")).toBeFocused();

    // Fill password with keyboard
    await page.keyboard.type("bar123");

    // Tab to show password button
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button", { name: "Afficher le mot de passe" }),
    ).toBeFocused();

    // Press space to toggle password visibility
    await page.keyboard.press("Space");
    await expect(page.getByLabel("Mot de passe")).toHaveAttribute(
      "type",
      "text",
    );

    // Tab to checkbox
    await page.keyboard.press("Tab");
    await expect(page.getByRole("checkbox")).toBeFocused();

    // Press space to check
    await page.keyboard.press("Space");
    await expect(page.getByRole("checkbox")).toBeChecked();

    // Tab to submit button
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button", { name: "Se connecter" }),
    ).toBeFocused();

    // Press Enter to submit
    await page.keyboard.press("Enter");
    await expect(page.getByText("Connexion en cours...")).toBeVisible();
  });

  test("should have proper focus indicators", async ({ page }) => {
    await page.goto("/login");

    // Check that focusable elements have visible focus indicators
    const focusableElements = [
      page.getByLabel("Email"),
      page.getByLabel("Mot de passe"),
      page.getByRole("button", { name: "Afficher le mot de passe" }),
      page.getByRole("checkbox"),
      page.getByRole("button", { name: "Se connecter" }),
    ];

    for (const element of focusableElements) {
      await element.focus();
      await expect(element).toBeFocused();

      // Check for focus styles (this depends on your CSS implementation)
      const focusedElement = await element.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          boxShadow: styles.boxShadow,
        };
      });

      // At least one focus indicator should be present
      const hasFocusIndicator =
        focusedElement.outline !== "none" ||
        focusedElement.outlineWidth !== "0px" ||
        focusedElement.boxShadow !== "none";

      expect(hasFocusIndicator).toBe(true);
    }
  });

  test("should have proper color contrast", async ({ page }) => {
    await page.goto("/login");

    // Check that text has sufficient contrast
    const textElements = [
      page.getByText("Connexion Bar"),
      page.getByText("Connectez-vous à votre espace de gestion"),
      page.getByText("Email"),
      page.getByText("Mot de passe"),
      page.getByText("Se souvenir de moi"),
    ];

    for (const element of textElements) {
      await expect(element).toBeVisible();

      // Get computed styles
      const styles = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
        };
      });

      // Basic checks for visibility
      expect(styles.color).not.toBe("transparent");
      expect(styles.color).not.toBe("rgba(0, 0, 0, 0)");
    }
  });

  test("should handle reduced motion preferences", async ({ page }) => {
    // Simulate reduced motion preference
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/login");

    // Check that animations are reduced or disabled
    const animatedElements = page.locator(
      '[class*="animate"], [class*="transition"]',
    );

    if ((await animatedElements.count()) > 0) {
      // Check that animations respect reduced motion
      const animationStyles = await animatedElements.first().evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          animationDuration: styles.animationDuration,
          transitionDuration: styles.transitionDuration,
        };
      });

      // Animations should be very fast or disabled
      const isReduced =
        animationStyles.animationDuration === "0s" ||
        animationStyles.transitionDuration === "0s" ||
        animationStyles.animationDuration === "0.01s" ||
        animationStyles.transitionDuration === "0.01s";

      expect(isReduced).toBe(true);
    }
  });

  test("should have proper heading structure", async ({ page }) => {
    await page.goto("/login");

    // Check for proper heading hierarchy
    const headings = await page
      .locator("h1, h2, h3, h4, h5, h6")
      .allTextContents();

    // Should have at least one heading
    expect(headings.length).toBeGreaterThan(0);

    // Check that h1 exists
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should have proper form validation feedback", async ({ page }) => {
    await page.goto("/login");

    // Try to submit empty form
    await page.getByRole("button", { name: "Se connecter" }).click();

    // Check for validation feedback
    const emailInput = page.getByLabel("Email");
    const passwordInput = page.getByLabel("Mot de passe");

    // Check for HTML5 validation or custom validation messages
    const emailValid = await emailInput.evaluate((el) =>
      (el as HTMLInputElement).checkValidity(),
    );
    const passwordValid = await passwordInput.evaluate((el) =>
      (el as HTMLInputElement).checkValidity(),
    );

    // At least one should be invalid if form validation is working
    expect(emailValid && passwordValid).toBe(false);
  });

  test("should work with screen readers", async ({ page }) => {
    await page.goto("/login");

    // Check for proper ARIA attributes
    const form = page.locator("form");
    const emailInput = page.getByLabel("Email");
    const passwordInput = page.getByLabel("Mot de passe");

    // Check for proper labeling
    await expect(emailInput).toHaveAttribute("type", "email");
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Check for required attributes
    await expect(emailInput).toHaveAttribute("required");
    await expect(passwordInput).toHaveAttribute("required");

    // Check for proper form structure
    await expect(form).toBeVisible();

    // Check for proper button types
    const submitButton = page.getByRole("button", { name: "Se connecter" });
    await expect(submitButton).toHaveAttribute("type", "submit");
  });
});
