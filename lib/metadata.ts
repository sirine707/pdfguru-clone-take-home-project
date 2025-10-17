import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export function generateSEOMetadata({
  title,
  description,
  path,
  locale = "en",
  image = `${baseUrl}/og-image.png`,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  locale?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    keywords: [
      "PDF editor",
      "PDF converter",
      "PDF summarizer",
      "edit PDF",
      "convert PDF",
      "AI PDF",
      "PDF tools",
      "document management",
      "PDF to Word",
      "PDF to Image",
      "compress PDF",
      "merge PDF",
      "split PDF",
    ],
    authors: [{ name: "PDF Guru" }],
    creator: "PDF Guru",
    publisher: "PDF Guru",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en${path.replace(/^\/(en|fr)/, "")}`,
        fr: `${baseUrl}/fr${path.replace(/^\/(en|fr)/, "")}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "PDF Guru",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@pdfguru",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

