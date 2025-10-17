import EditSignModule from "../../../components/EditSignModule";
import { Metadata } from 'next';
import { generateSEOMetadata } from '../../../lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    en: 'Edit & Sign PDF - Annotate, Compress, Split, Merge PDFs',
    fr: 'Éditer et Signer PDF - Annoter, Compresser, Diviser, Fusionner des PDF',
  };
  
  const descriptions = {
    en: 'Edit PDF documents online. Add text, images, annotations, signatures. Compress, split, merge, and sign PDFs easily with our powerful editor.',
    fr: 'Éditez des documents PDF en ligne. Ajoutez du texte, des images, des annotations, des signatures. Compressez, divisez, fusionnez et signez des PDF facilement avec notre éditeur puissant.',
  };

  return generateSEOMetadata({
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    path: `/${locale}/edit-sign`,
    locale,
  });
}

export default function EditSignPage() {
  return <EditSignModule />;
}
