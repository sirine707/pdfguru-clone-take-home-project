"use client";

import { useState } from "react";
import Header from "./Header";
import FileUploadModal from "./FileUploadModal";

interface ConversionTool {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  allowedFileTypes?: string[];
}

// Convert from PDF tools
const convertFromPdfTools: ConversionTool[] = [
  {
    id: "pdf-converter",
    name: "PDF Converter",
    icon: "📄",
    bgColor: "bg-red-100",
  },
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    icon: "📝",
    bgColor: "bg-blue-100",
  },
  {
    id: "pdf-to-png",
    name: "PDF to PNG",
    icon: "🖼️",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["application/pdf"],
  },
  { id: "pdf-to-jpg", name: "PDF to JPG", icon: "🖼️", bgColor: "bg-pink-100" },
  {
    id: "pdf-to-excel",
    name: "PDF to Excel",
    icon: "📊",
    bgColor: "bg-green-100",
  },
  {
    id: "pdf-to-pptx",
    name: "PDF to PPTX",
    icon: "📽️",
    bgColor: "bg-orange-100",
  },
  {
    id: "pdf-to-azw3",
    name: "PDF to AZW3",
    icon: "📚",
    bgColor: "bg-yellow-100",
  },
  {
    id: "pdf-to-docx",
    name: "PDF to DOCX",
    icon: "📄",
    bgColor: "bg-purple-100",
  },
  {
    id: "pdf-to-mobi",
    name: "PDF to MOBI",
    icon: "📱",
    bgColor: "bg-blue-100",
  },
  {
    id: "pdf-to-text",
    name: "PDF to Text",
    icon: "📝",
    bgColor: "bg-purple-100",
  },
  {
    id: "pdf-to-tiff",
    name: "PDF to TIFF",
    icon: "🖼️",
    bgColor: "bg-teal-100",
  },
  {
    id: "pdf-to-dxf",
    name: "PDF to DXF",
    icon: "🎯",
    bgColor: "bg-orange-100",
  },
  {
    id: "pdf-to-html",
    name: "PDF to HTML",
    icon: "🌐",
    bgColor: "bg-green-100",
  },
  { id: "pdf-to-eps", name: "PDF to EPS", icon: "📐", bgColor: "bg-blue-100" },
  {
    id: "pdf-to-webp",
    name: "PDF to WebP",
    icon: "📷",
    bgColor: "bg-purple-100",
  },
  {
    id: "pdf-to-epub",
    name: "PDF to EPUB",
    icon: "📖",
    bgColor: "bg-green-100",
  },
  {
    id: "pdf-to-image",
    name: "PDF to Image",
    icon: "🖼️",
    bgColor: "bg-purple-100",
  },
  { id: "pdf-to-svg", name: "PDF to SVG", icon: "🎨", bgColor: "bg-pink-100" },
];

// Convert to PDF tools
const convertToPdfTools: ConversionTool[] = [
  {
    id: "pdf-converter",
    name: "PDF Converter",
    icon: "📄",
    bgColor: "bg-pink-100",
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    icon: "📝",
    bgColor: "bg-blue-100",
  },
  {
    id: "png-to-pdf",
    name: "PNG to PDF",
    icon: "🖼️",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["image/png"],
  },
  { id: "jpg-to-pdf", name: "JPG to PDF", icon: "🖼️", bgColor: "bg-pink-100" },
  {
    id: "excel-to-pdf",
    name: "Excel to PDF",
    icon: "📊",
    bgColor: "bg-green-100",
  },
  {
    id: "pptx-to-pdf",
    name: "PPTX to PDF",
    icon: "📽️",
    bgColor: "bg-orange-100",
  },
  {
    id: "azw3-to-pdf",
    name: "AZW3 to PDF",
    icon: "📚",
    bgColor: "bg-yellow-100",
  },
  { id: "csv-to-pdf", name: "CSV to PDF", icon: "📄", bgColor: "bg-blue-100" },
  {
    id: "djvu-to-pdf",
    name: "DjVu to PDF",
    icon: "📎",
    bgColor: "bg-purple-100",
  },
  {
    id: "docx-to-pdf",
    name: "DOCX to PDF",
    icon: "📄",
    bgColor: "bg-pink-100",
  },
  { id: "dwg-to-pdf", name: "DWG to PDF", icon: "➕", bgColor: "bg-cyan-100" },
  {
    id: "dxf-to-pdf",
    name: "DXF to PDF",
    icon: "⚙️",
    bgColor: "bg-orange-100",
  },
  { id: "eps-to-pdf", name: "EPS to PDF", icon: "👥", bgColor: "bg-blue-100" },
  {
    id: "epub-to-pdf",
    name: "EPUB to PDF",
    icon: "✅",
    bgColor: "bg-green-100",
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    icon: "🖼️",
    bgColor: "bg-purple-100",
  },
  {
    id: "html-to-pdf",
    name: "HTML to PDF",
    icon: "🌐",
    bgColor: "bg-green-100",
  },
  {
    id: "mobi-to-pdf",
    name: "MOBI to PDF",
    icon: "📱",
    bgColor: "bg-blue-100",
  },
  { id: "svg-to-pdf", name: "SVG to PDF", icon: "🎨", bgColor: "bg-pink-100" },
  {
    id: "text-to-pdf",
    name: "Text to PDF",
    icon: "📝",
    bgColor: "bg-purple-100",
  },
  {
    id: "tiff-to-pdf",
    name: "TIFF to PDF",
    icon: "🖼️",
    bgColor: "bg-blue-100",
  },
  {
    id: "webp-to-pdf",
    name: "WebP to PDF",
    icon: "📷",
    bgColor: "bg-pink-100",
  },
  {
    id: "avif-to-pdf",
    name: "Avif to PDF",
    icon: "🎬",
    bgColor: "bg-orange-100",
  },
  {
    id: "heic-to-pdf",
    name: "Heic to PDF",
    icon: "📱",
    bgColor: "bg-pink-100",
  },
  {
    id: "cbr-to-pdf",
    name: "CBR to PDF",
    icon: "📚",
    bgColor: "bg-purple-100",
  },
  { id: "rtf-to-pdf", name: "RTF to PDF", icon: "📄", bgColor: "bg-pink-100" },
  {
    id: "xps-to-pdf",
    name: "XPS to PDF",
    icon: "📄",
    bgColor: "bg-orange-100",
  },
];

// Other Formats tools
const otherFormatsTools: ConversionTool[] = [
  {
    id: "compress-pdf",
    name: "Compress PDF",
    icon: "📦",
    bgColor: "bg-blue-100",
  },
  { id: "merge-pdf", name: "Merge PDF", icon: "📄", bgColor: "bg-green-100" },
  { id: "split-pdf", name: "Split PDF", icon: "✂️", bgColor: "bg-orange-100" },
  {
    id: "rotate-pdf",
    name: "Rotate PDF",
    icon: "🔄",
    bgColor: "bg-purple-100",
  },
  {
    id: "watermark-pdf",
    name: "Watermark PDF",
    icon: "💧",
    bgColor: "bg-cyan-100",
  },
  { id: "protect-pdf", name: "Protect PDF", icon: "🔒", bgColor: "bg-red-100" },
  { id: "unlock-pdf", name: "Unlock PDF", icon: "🔓", bgColor: "bg-green-100" },
  {
    id: "repair-pdf",
    name: "Repair PDF",
    icon: "🔧",
    bgColor: "bg-yellow-100",
  },
];

export default function ConverterModule() {
  const [activeTab, setActiveTab] = useState<"from" | "to" | "other">("from");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ConversionTool | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionResult, setConversionResult] = useState<{
    fileUrl: string;
    fileName: string;
  } | null>(null);
  const [conversionError, setConversionError] = useState<string | null>(null);

  const getCurrentTools = () => {
    switch (activeTab) {
      case "from":
        return convertFromPdfTools;
      case "to":
        return convertToPdfTools;
      case "other":
        return otherFormatsTools;
      default:
        return convertFromPdfTools;
    }
  };

  const handleToolClick = (tool: ConversionTool) => {
    // Only open modal for pdf-to-png and png-to-pdf for now
    if (tool.id === "pdf-to-png" || tool.id === "png-to-pdf") {
      setSelectedTool(tool);
      setIsModalOpen(true);
      setConversionResult(null);
      setConversionError(null);
    }
  };

  const handleFileSelect = async (file: File) => {
    if (!selectedTool) return;

    setIsConverting(true);
    setConversionError(null);
    setIsModalOpen(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `http://localhost:4000/converter/convert/${selectedTool.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success && data.result) {
        setConversionResult(data.result);
        // Automatically download the file
        downloadFile(data.result.fileUrl, data.result.fileName);
      } else {
        setConversionError("Conversion failed. Please try again.");
      }
    } catch (error) {
      console.error("Conversion error:", error);
      setConversionError(
        "An error occurred during conversion. Please try again."
      );
    } finally {
      setIsConverting(false);
    }
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  const handleCloseResult = () => {
    setConversionResult(null);
    setConversionError(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="converter" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black">PDF Converter Tool</h1>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("from")}
              className={`pb-4 font-medium transition-colors ${
                activeTab === "from"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Convert from PDF
            </button>
            <button
              onClick={() => setActiveTab("to")}
              className={`pb-4 font-medium transition-colors ${
                activeTab === "to"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Convert to PDF
            </button>
            <button
              onClick={() => setActiveTab("other")}
              className={`pb-4 font-medium transition-colors ${
                activeTab === "other"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Other Formats
            </button>
          </div>
        </div>

        {/* Conversion Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {getCurrentTools().map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className={`${tool.bgColor} rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{tool.icon}</div>
                <div className="text-black font-medium">{tool.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFileSelect={handleFileSelect}
        allowedFileTypes={selectedTool?.allowedFileTypes}
        submitButtonText="Convert"
      />

      {/* Loading Modal */}
      {isConverting && (
        <div className="fixed inset-0 bg-[#000000aa] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Converting...
              </h3>
              <p className="text-gray-600 text-center">
                Please wait while we convert your file
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {conversionResult && (
        <div className="fixed inset-0 bg-[#000000aa] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Conversion Successful!
              </h2>
              <button
                onClick={handleCloseResult}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <p className="text-center text-gray-700 mb-4">
                Your file has been converted successfully!
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">File name:</p>
                <p className="text-gray-900 font-medium break-all">
                  {conversionResult.fileName}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() =>
                  downloadFile(
                    conversionResult.fileUrl,
                    conversionResult.fileName
                  )
                }
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
              >
                Download Again
              </button>
              <button
                onClick={handleCloseResult}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 px-4 rounded-md font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {conversionError && (
        <div className="fixed inset-0 bg-[#000000aa] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Conversion Failed
              </h2>
              <button
                onClick={handleCloseResult}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <svg
                  className="w-16 h-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <p className="text-center text-gray-700 mb-4">
                {conversionError}
              </p>
            </div>

            <button
              onClick={handleCloseResult}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

