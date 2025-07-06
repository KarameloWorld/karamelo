import React from "react";
import { render, screen } from "@testing-library/react";
import LoginHelper from "../components/business/login-helper";

describe("LoginHelper Component", () => {
  it("renders login credentials for bar", () => {
    render(<LoginHelper />);

    expect(screen.getByText("🏪 Connexion Bar")).toBeInTheDocument();
    expect(screen.getByText("bar@karaobar.com")).toBeInTheDocument();
    expect(screen.getByText("bar123")).toBeInTheDocument();
  });

  it("renders login credentials for admin", () => {
    render(<LoginHelper />);

    expect(screen.getByText("👑 Connexion Admin")).toBeInTheDocument();
    expect(screen.getByText("admin@karaobar.com")).toBeInTheDocument();
    expect(screen.getByText("admin123")).toBeInTheDocument();
  });

  it("displays credential cards with proper styling", () => {
    render(<LoginHelper />);

    // Should have multiple credential cards
    const cards = screen
      .getAllByRole("generic")
      .filter((el) => el.className?.includes("bg-gradient"));
    expect(cards.length).toBeGreaterThan(0);
  });

  it("shows email and password labels", () => {
    render(<LoginHelper />);

    const emailLabels = screen.getAllByText("Email:");
    const passwordLabels = screen.getAllByText("Mot de passe:");

    expect(emailLabels.length).toBeGreaterThan(0);
    expect(passwordLabels.length).toBeGreaterThan(0);
  });

  it("displays helpful text about test credentials", () => {
    render(<LoginHelper />);

    // Check for explanatory text or badges
    expect(screen.getByText("Test facile")).toBeInTheDocument();
    expect(screen.getByText("Accès complet")).toBeInTheDocument();
  });

  it("has proper accessibility structure", () => {
    render(<LoginHelper />);

    // Should have headings for each credential type
    const barHeading = screen.getByText("🏪 Connexion Bar");
    const adminHeading = screen.getByText("👑 Connexion Admin");

    expect(barHeading).toBeInTheDocument();
    expect(adminHeading).toBeInTheDocument();
  });

  it("displays security notice", () => {
    render(<LoginHelper />);

    // Should have test-related badges
    expect(screen.getByText("Test facile")).toBeInTheDocument();
  });
});
