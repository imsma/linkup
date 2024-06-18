import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

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
      <body>
        <h2 className="text-2xl">app/layout.tsx</h2>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
