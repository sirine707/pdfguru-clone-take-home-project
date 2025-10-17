import SummarizerEditorModule from "../../../../components/SummarizerEditorModule";
import { Metadata } from 'next';
import { generateSEOMetadata } from '../../../../lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    en: 'AI PDF Summary - Chat with Your Document',
    fr: 'Résumé PDF IA - Chattez avec Votre Document',
  };
  
  const descriptions = {
    en: 'View AI-generated summary and chat with your PDF document. Ask questions and get intelligent insights from your document.',
    fr: 'Consultez le résumé généré par IA et discutez avec votre document PDF. Posez des questions et obtenez des informations intelligentes de votre document.',
  };

  return generateSEOMetadata({
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    path: `/${locale}/summarizer/editor`,
    locale,
  });
}

export default function SummarizerEditorPage() {
  return <SummarizerEditorModule />;
}

