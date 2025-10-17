import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDF Guru Clone (Take-Home Project)",
  description: "Your Complete PDF Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.8.0/nutrient-viewer.js"
          // Load before the page becomes interactive to reference `window.NutrientViewer` in the client.
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
