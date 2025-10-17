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
  title: {
    default: "PDF Guru - Your Complete PDF Solution",
    template: "%s | PDF Guru",
  },
  description: "Edit, convert, and summarize PDFs with AI. Powerful PDF tools for editing, annotating, compressing, converting, splitting, merging, and AI-powered summarization.",
  applicationName: "PDF Guru",
  keywords: [
    'PDF editor',
    'PDF converter',
    'PDF summarizer',
    'edit PDF',
    'convert PDF',
    'AI PDF',
    'PDF tools',
    'document management',
    'PDF to Word',
    'PDF to Image',
    'compress PDF',
    'merge PDF',
    'split PDF',
  ],
  authors: [{ name: 'PDF Guru' }],
  creator: 'PDF Guru',
  publisher: 'PDF Guru',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
