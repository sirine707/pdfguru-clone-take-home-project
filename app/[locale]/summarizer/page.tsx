import SummarizerModule from "../../../components/SummarizerModule";
import { Metadata } from 'next';
import { generateSEOMetadata } from '../../../lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    en: 'AI PDF Summarizer - Summarize PDFs with Artificial Intelligence',
    fr: 'Résumeur PDF IA - Résumer des PDF avec l\'Intelligence Artificielle',
  };
  
  const descriptions = {
    en: 'AI-powered PDF summarizer. Get instant summaries and insights from your PDF documents. Ask questions and get intelligent answers about your documents.',
    fr: 'Résumeur PDF alimenté par IA. Obtenez des résumés instantanés et des informations de vos documents PDF. Posez des questions et obtenez des réponses intelligentes sur vos documents.',
  };

  return generateSEOMetadata({
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    path: `/${locale}/summarizer`,
    locale,
  });
}

export default function SummarizerPage() {
  return <SummarizerModule />;
}
