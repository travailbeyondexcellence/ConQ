import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conq - Social Media Content Pipeline Manager",
  description: "Manage, schedule, and publish your social media content across multiple platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
