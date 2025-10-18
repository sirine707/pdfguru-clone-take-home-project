"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "../../lib/navigation";
import Header from "../../components/Header";
import { useFile } from "../../contexts/FileContext";

export default function Home() {
  const t = useTranslations("Home");
  const router = useRouter();
  const { setSelectedFile } = useFile();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (file: File) => {
    // Validate file type - accept only PDF files
    if (file.type !== "application/pdf") {
      setError(t("errors.invalidFile"));
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setError(t("errors.fileTooLarge"));
      return;
    }

    setError(null);
    setSelectedFile(file);
    // Redirect to edit-sign editor with edit tool
    router.push("/edit-sign/editor?tool=edit");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const modules = [
    {
      title: t("modules.editSign.title"),
      description: t("modules.editSign.description"),
      href: "/edit-sign",
      icon: "✏️",
      features: [
        t("modules.editSign.features.edit"),
        t("modules.editSign.features.compress"),
        t("modules.editSign.features.split"),
        t("modules.editSign.features.merge"),
        t("modules.editSign.features.sign"),
        t("modules.editSign.features.annotate"),
      ],
    },
    {
      title: t("modules.converter.title"),
      description: t("modules.converter.description"),
      href: "/converter",
      icon: "🔄",
      features: [
        t("modules.converter.features.pdfToWord"),
        t("modules.converter.features.pdfToImage"),
        t("modules.converter.features.wordToPdf"),
        t("modules.converter.features.imageToPdf"),
        t("modules.converter.features.excelToPdf"),
      ],
    },
    {
      title: t("modules.summarizer.title"),
      description: t("modules.summarizer.description"),
      href: "/summarizer",
      icon: "🤖",
      features: [
        t("modules.summarizer.features.aiAnalysis"),
        t("modules.summarizer.features.quickProcessing"),
        t("modules.summarizer.features.multipleFormats"),
        t("modules.summarizer.features.keyInsights"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="home" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-black mb-6 leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            {t("heroSubtitle")}
          </p>
          
          {/* Upload Section */}
          <div className="relative max-w-2xl mx-auto mb-16">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
            />
            
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
            
            <div 
              onClick={handleUploadClick}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`bg-red-500 rounded-2xl p-12 border-4 border-dashed border-red-300 relative overflow-hidden cursor-pointer transition-all duration-300 ${
                isDragging ? 'scale-105 shadow-2xl' : 'hover:scale-102 hover:shadow-xl'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 opacity-90"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 ${
                  isDragging ? 'scale-110' : ''
                }`}>
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isDragging ? t("dropFile") : t("uploadTitle")}
                </h3>
                <p className="text-red-100 text-lg">{t("uploadSize")}</p>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 mb-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg font-medium text-gray-800">{t("features.privacy")}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span className="text-lg font-medium text-gray-800">{t("features.easy")}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-medium text-gray-800">{t("features.fast")}</span>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {modules.map((module, index) => (
            <Link
              key={index}
              href={module.href}
              className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-red-200 transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-red-100 group-hover:to-red-200 transition-all duration-300">
                  <span className="text-4xl">{module.icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-black mb-4 group-hover:text-red-600 transition-colors">
                  {module.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{module.description}</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                  {t("keyFeatures")}
                </h3>
                {module.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center space-x-2 text-red-500 font-semibold group-hover:text-red-600 transition-colors">
                  <span>{t("getStarted")}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 border border-gray-200">
            <h2 className="text-4xl font-bold text-black mb-6">
              {t("ctaTitle")}
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              {t("ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link
                href="/edit-sign"
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t("startEditing")}
              </Link>
              <Link
                href="/converter"
                className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center transform hover:scale-105"
              >
                {t("convertFiles")}
              </Link>
              <Link
                href="/summarizer"
                className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center transform hover:scale-105"
              >
                {t("aiSummarize")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
