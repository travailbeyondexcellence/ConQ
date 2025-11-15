import "./globals.css";
import ThemeScript from "./theme-script";
import { Providers } from "./providers";
import ConditionalNavbar from "@/components/ConditionalNavbar";

export const metadata = {
  title: "Conq - Social Media Content Pipeline Manager",
  description: "Manage, schedule, and publish your social media content across multiple platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <ConditionalNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
