import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n';
import { AuthProvider } from '../../contexts/AuthContext';
import { FileProvider } from '../../contexts/FileContext';
import { Metadata } from 'next';
import { generateSEOMetadata } from '../../lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    en: 'Your Complete PDF Solution',
    fr: 'Votre solution PDF complète',
  };
  
  const descriptions = {
    en: 'Edit, convert, and summarize PDFs with AI. Powerful PDF tools for editing, annotating, compressing, converting, splitting, merging, and AI-powered summarization.',
    fr: 'Éditez, convertissez et résumez des PDF avec IA. Outils PDF puissants pour éditer, annoter, compresser, convertir, diviser, fusionner et résumer avec IA.',
  };

  return generateSEOMetadata({
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    path: `/${locale}`,
    locale,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <AuthProvider>
        <FileProvider>{children}</FileProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}

