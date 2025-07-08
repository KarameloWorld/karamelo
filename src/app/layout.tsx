import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KaraMelo - Gestion Karaoké",
  description:
    "Plateforme de gestion de soirées karaoké pour bars et établissements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
