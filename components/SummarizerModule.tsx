"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "../lib/navigation";
import Header from "./Header";
import { useFile } from "../contexts/FileContext";

export default function SummarizerModule() {
  const t = useTranslations("SummarizerModule");
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { selectedFile, setSelectedFile } = useFile();

  // Cleanup file input when component unmounts
  useEffect(() => {
    if (fileInputRef.current) {
      setSelectedFile(null);
      fileInputRef.current.value = "";
    }
  }, []);

  const validateAndSetFile = (file: File) => {
    // Validate file type
    if (file.type !== "application/pdf") {
      setError(t("errors.invalidFile"));
      setSelectedFile(null);
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setError(t("errors.fileTooLarge"));
      setSelectedFile(null);
      return;
    }

    setError(null);
    setSelectedFile(file);
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

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = () => {
    if (!selectedFile) {
      setError(t("errors.noFile"));
      return;
    }

    // File is already stored in context, navigate to editor
    router.push("/summarizer/editor");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="summarizer" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-black mb-6 leading-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>

          {/* Upload Section */}
          <div className="relative max-w-2xl mx-auto mb-16">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,application/pdf"
              className="hidden"
            />
            
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
            
            <div 
              onClick={handleBrowseClick}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedFile
                    ? selectedFile.name
                    : isDragging
                    ? t("upload.dropFile")
                    : t("upload.uploadDocument")}
                </h3>
                <p className="text-red-100 text-lg">
                  {selectedFile
                    ? t("upload.fileSelected")
                    : t("upload.maxSize")}
                </p>
              </div>
            </div>
          </div>

          {selectedFile && (
            <div className="text-center mb-16">
              <button
                onClick={handleContinue}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t("upload.continue")}
              </button>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 text-center hover:shadow-xl hover:border-red-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("features.aiPowered.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("features.aiPowered.description")}
              </p>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 text-center hover:shadow-xl hover:border-red-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("features.quickProcessing.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("features.quickProcessing.description")}
              </p>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 text-center hover:shadow-xl hover:border-red-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("features.multipleFormats.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("features.multipleFormats.description")}
              </p>
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 border border-gray-200">
            <h2 className="text-4xl font-bold text-black mb-10 text-center">
              {t("howItWorks.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t("howItWorks.steps.upload.title")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("howItWorks.steps.upload.description")}
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t("howItWorks.steps.analyze.title")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("howItWorks.steps.analyze.description")}
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t("howItWorks.steps.generate.title")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("howItWorks.steps.generate.description")}
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t("howItWorks.steps.download.title")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("howItWorks.steps.download.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

