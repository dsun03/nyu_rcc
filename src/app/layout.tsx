import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYU Rubik's Cube Club",
  description: "Website for NYU Rubik's Cube Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/icon.ico" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
