import ConverterModule from "../../../components/ConverterModule";
import { Metadata } from 'next';
import { generateSEOMetadata } from '../../../lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    en: 'PDF Converter - Convert PDF to Word, Image & More',
    fr: 'Convertisseur PDF - Convertir PDF en Word, Image et Plus',
  };
  
  const descriptions = {
    en: 'Convert PDF files to Word, Excel, PowerPoint, Image formats and vice versa. Fast, secure, and free PDF conversion tools.',
    fr: 'Convertissez des fichiers PDF en Word, Excel, PowerPoint, formats d\'image et vice versa. Outils de conversion PDF rapides, sécurisés et gratuits.',
  };

  return generateSEOMetadata({
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    path: `/${locale}/converter`,
    locale,
  });
}

export default function ConverterPage() {
  return <ConverterModule />;
}
