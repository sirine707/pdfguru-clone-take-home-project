import EditorModule from "../../../../components/EditorModule";
import { Metadata } from 'next';
import { generateSEOMetadata } from '../../../../lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    en: 'PDF Editor - Edit Your PDF Document',
    fr: 'Éditeur PDF - Modifiez Votre Document PDF',
  };
  
  const descriptions = {
    en: 'Edit your PDF document with our powerful online editor. Add text, images, annotations, and signatures to your PDF files.',
    fr: 'Modifiez votre document PDF avec notre éditeur en ligne puissant. Ajoutez du texte, des images, des annotations et des signatures à vos fichiers PDF.',
  };

  return generateSEOMetadata({
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    path: `/${locale}/edit-sign/editor`,
    locale,
  });
}

export default function EditorPage() {
  return <EditorModule />;
}

