import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkUp",
  description: "LinkUp is a social media platform for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
