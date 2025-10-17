"use client";

import { useState } from "react";
import Header from "./Header";
import FileUploadModal from "./FileUploadModal";
import FormatSelectionModal from "./FormatSelectionModal";

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
    allowedFileTypes: [],
  },
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    icon: "📝",
    bgColor: "bg-blue-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-png",
    name: "PDF to PNG",
    icon: "🖼️",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    icon: "🖼️",
    bgColor: "bg-pink-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-excel",
    name: "PDF to Excel",
    icon: "📊",
    bgColor: "bg-green-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-pptx",
    name: "PDF to PPTX",
    icon: "📽️",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-azw3",
    name: "PDF to AZW3",
    icon: "📚",
    bgColor: "bg-yellow-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-docx",
    name: "PDF to DOCX",
    icon: "📄",
    bgColor: "bg-purple-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-mobi",
    name: "PDF to MOBI",
    icon: "📱",
    bgColor: "bg-blue-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-text",
    name: "PDF to Text",
    icon: "📝",
    bgColor: "bg-purple-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-tiff",
    name: "PDF to TIFF",
    icon: "🖼️",
    bgColor: "bg-teal-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-dxf",
    name: "PDF to DXF",
    icon: "🎯",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-html",
    name: "PDF to HTML",
    icon: "🌐",
    bgColor: "bg-green-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-eps",
    name: "PDF to EPS",
    icon: "📐",
    bgColor: "bg-blue-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-webp",
    name: "PDF to WebP",
    icon: "📷",
    bgColor: "bg-purple-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-epub",
    name: "PDF to EPUB",
    icon: "📖",
    bgColor: "bg-green-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-image",
    name: "PDF to Image",
    icon: "🖼️",
    bgColor: "bg-purple-100",
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-svg",
    name: "PDF to SVG",
    icon: "🎨",
    bgColor: "bg-pink-100",
    allowedFileTypes: ["application/pdf"],
  },
];

// Convert to PDF tools
const convertToPdfTools: ConversionTool[] = [
  {
    id: "pdf-converter",
    name: "PDF Converter",
    icon: "📄",
    bgColor: "bg-pink-100",
    allowedFileTypes: [],
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    icon: "📝",
    bgColor: "bg-blue-100",
    allowedFileTypes: [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  {
    id: "png-to-pdf",
    name: "PNG to PDF",
    icon: "🖼️",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["image/png"],
  },
  {
    id: "jpg-to-pdf",
    name: "JPG to PDF",
    icon: "🖼️",
    bgColor: "bg-pink-100",
    allowedFileTypes: ["image/jpeg"],
  },
  {
    id: "excel-to-pdf",
    name: "Excel to PDF",
    icon: "📊",
    bgColor: "bg-green-100",
    allowedFileTypes: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
  },
  {
    id: "pptx-to-pdf",
    name: "PPTX to PDF",
    icon: "📽️",
    bgColor: "bg-orange-100",
    allowedFileTypes: [
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
  },
  {
    id: "azw3-to-pdf",
    name: "AZW3 to PDF",
    icon: "📚",
    bgColor: "bg-yellow-100",
    allowedFileTypes: ["application/vnd.amazon.ebook"],
  },
  {
    id: "csv-to-pdf",
    name: "CSV to PDF",
    icon: "📄",
    bgColor: "bg-blue-100",
    allowedFileTypes: ["text/csv"],
  },
  {
    id: "djvu-to-pdf",
    name: "DjVu to PDF",
    icon: "📎",
    bgColor: "bg-purple-100",
    allowedFileTypes: ["image/vnd.djvu", "image/x-djvu"],
  },
  {
    id: "docx-to-pdf",
    name: "DOCX to PDF",
    icon: "📄",
    bgColor: "bg-pink-100",
    allowedFileTypes: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  {
    id: "dwg-to-pdf",
    name: "DWG to PDF",
    icon: "➕",
    bgColor: "bg-cyan-100",
    allowedFileTypes: ["image/vnd.dwg", "application/acad"],
  },
  {
    id: "dxf-to-pdf",
    name: "DXF to PDF",
    icon: "⚙️",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["application/dxf", "image/vnd.dxf"],
  },
  {
    id: "eps-to-pdf",
    name: "EPS to PDF",
    icon: "👥",
    bgColor: "bg-blue-100",
    allowedFileTypes: ["application/postscript"],
  },
  {
    id: "epub-to-pdf",
    name: "EPUB to PDF",
    icon: "✅",
    bgColor: "bg-green-100",
    allowedFileTypes: ["application/epub+zip"],
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    icon: "🖼️",
    bgColor: "bg-purple-100",
    allowedFileTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
  },
  {
    id: "html-to-pdf",
    name: "HTML to PDF",
    icon: "🌐",
    bgColor: "bg-green-100",
    allowedFileTypes: ["text/html"],
  },
  {
    id: "mobi-to-pdf",
    name: "MOBI to PDF",
    icon: "📱",
    bgColor: "bg-blue-100",
    allowedFileTypes: ["application/x-mobipocket-ebook"],
  },
  {
    id: "svg-to-pdf",
    name: "SVG to PDF",
    icon: "🎨",
    bgColor: "bg-pink-100",
    allowedFileTypes: ["image/svg+xml"],
  },
  {
    id: "text-to-pdf",
    name: "Text to PDF",
    icon: "📝",
    bgColor: "bg-purple-100",
    allowedFileTypes: ["text/plain"],
  },
  {
    id: "tiff-to-pdf",
    name: "TIFF to PDF",
    icon: "🖼️",
    bgColor: "bg-blue-100",
    allowedFileTypes: ["image/tiff"],
  },
  {
    id: "webp-to-pdf",
    name: "WebP to PDF",
    icon: "📷",
    bgColor: "bg-pink-100",
    allowedFileTypes: ["image/webp"],
  },
  {
    id: "avif-to-pdf",
    name: "Avif to PDF",
    icon: "🎬",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["image/avif"],
  },
  {
    id: "heic-to-pdf",
    name: "Heic to PDF",
    icon: "📱",
    bgColor: "bg-pink-100",
    allowedFileTypes: ["image/heic", "image/heif"],
  },
  {
    id: "cbr-to-pdf",
    name: "CBR to PDF",
    icon: "📚",
    bgColor: "bg-purple-100",
    allowedFileTypes: ["application/x-cbr"],
  },
  {
    id: "rtf-to-pdf",
    name: "RTF to PDF",
    icon: "📄",
    bgColor: "bg-pink-100",
    allowedFileTypes: ["application/rtf"],
  },
  {
    id: "xps-to-pdf",
    name: "XPS to PDF",
    icon: "📄",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["application/vnd.ms-xpsdocument"],
  },
];

// Other Formats tools
const otherFormatsTools: ConversionTool[] = [
  {
    id: "avif-to-jpg",
    name: "Avif to JPG",
    icon: "🖼️",
    bgColor: "bg-cyan-100",
    allowedFileTypes: ["image/avif"],
  },
  {
    id: "avif-to-png",
    name: "AVIF to PNG",
    icon: "🖼️",
    bgColor: "bg-purple-100",
    allowedFileTypes: ["image/avif"],
  },
  {
    id: "webp-to-png",
    name: "WEBP to PNG",
    icon: "📷",
    bgColor: "bg-cyan-100",
    allowedFileTypes: ["image/webp"],
  },
  {
    id: "epub-to-mobi",
    name: "Epub to MOBI",
    icon: "📖",
    bgColor: "bg-cyan-100",
    allowedFileTypes: ["application/epub+zip"],
  },
  {
    id: "csv-to-excel",
    name: "CSV to Excel",
    icon: "📊",
    bgColor: "bg-cyan-100",
    allowedFileTypes: ["text/csv"],
  },
  {
    id: "dwg-to-dxf",
    name: "DWG to DXF",
    icon: "🔲",
    bgColor: "bg-purple-100",
    allowedFileTypes: ["image/vnd.dwg", "application/acad"],
  },
  {
    id: "gif-to-jpg",
    name: "GIF to JPG",
    icon: "📷",
    bgColor: "bg-purple-100",
    allowedFileTypes: ["image/gif"],
  },
  {
    id: "gif-to-png",
    name: "GIF to PNG",
    icon: "📷",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["image/gif"],
  },
  {
    id: "jpeg-to-jpg",
    name: "JPEG to JPG",
    icon: "🖼️",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["image/jpeg"],
  },
  {
    id: "heic-to-jpg",
    name: "Heic to JPG",
    icon: "🖼️",
    bgColor: "bg-purple-100",
    allowedFileTypes: ["image/heic", "image/heif"],
  },
  {
    id: "heic-to-png",
    name: "Heic to PNG",
    icon: "🖼️",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["image/heic", "image/heif"],
  },
  {
    id: "jpg-to-png",
    name: "JPG to PNG",
    icon: "🖼️",
    bgColor: "bg-yellow-100",
    allowedFileTypes: ["image/jpeg"],
  },
  {
    id: "png-to-jpg",
    name: "PNG to JPG",
    icon: "🖼️",
    bgColor: "bg-yellow-100",
    allowedFileTypes: ["image/png"],
  },
  {
    id: "svg-to-jpg",
    name: "SVG to JPG",
    icon: "🖼️",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["image/svg+xml"],
  },
  {
    id: "webp-to-jpg",
    name: "WEBP to JPG",
    icon: "📷",
    bgColor: "bg-cyan-100",
    allowedFileTypes: ["image/webp"],
  },
  {
    id: "word-to-jpg",
    name: "Word to JPG",
    icon: "📄",
    bgColor: "bg-blue-100",
    allowedFileTypes: [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  {
    id: "png-to-webp",
    name: "PNG to WEBP",
    icon: "🖼️",
    bgColor: "bg-cyan-100",
    allowedFileTypes: ["image/png"],
  },
  {
    id: "svg-to-png",
    name: "SVG to PNG",
    icon: "🌊",
    bgColor: "bg-orange-100",
    allowedFileTypes: ["image/svg+xml"],
  },
];

const allTools = [
  ...convertFromPdfTools,
  ...convertToPdfTools,
  ...otherFormatsTools,
];

const pdfConverterAllowedMimeTypes = new Set<string>([
  "application/pdf",
  ...convertToPdfTools
    .map((tool) => tool.allowedFileTypes || ([] as string[]))
    .flat(),
]);

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
  const [isFormatModalOpen, setIsFormatModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    // Open modal if tool has allowedFileTypes defined
    // if (tool.allowedFileTypes && tool.allowedFileTypes.length > 0) {
    setSelectedTool(tool);
    setIsModalOpen(true);
    setConversionResult(null);
    setConversionError(null);
    // }
  };

  const handleFileSelect = async (file: File) => {
    if (!selectedTool) return;

    setIsConverting(true);
    setConversionError(null);
    setIsModalOpen(false);

    let toolId = selectedTool.id;

    if (toolId === "pdf-converter") {
      if (file.type === "application/pdf") {
        // Show format selection modal for PDF files
        setSelectedFile(file);
        setIsFormatModalOpen(true);
        setIsConverting(false);
        return;
      }

      const tool = convertToPdfTools.find((tool) =>
        tool.allowedFileTypes?.includes(file.type)
      );

      if (tool) {
        toolId = tool.id;
      } else {
        setConversionError("Invalid file type. Please select a valid file.");
        setIsConverting(false);
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `http://localhost:4000/converter/convert/${toolId}`,
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
        setConversionError(
          data.message || "Conversion failed. Please try again."
        );
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

  const handleFormatSelect = async (format: string) => {
    if (!selectedFile) return;

    setIsConverting(true);
    setConversionError(null);
    setIsFormatModalOpen(false);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        `http://localhost:4000/converter/convert/pdf-to-${format}`,
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
        setConversionError(
          data.message || "Conversion failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Conversion error:", error);
      setConversionError(
        "An error occurred during conversion. Please try again."
      );
    } finally {
      setIsConverting(false);
      setSelectedFile(null);
    }
  };

  const handleCloseFormatModal = () => {
    setIsFormatModalOpen(false);
    setSelectedFile(null);
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
        allowedFileTypes={
          selectedTool?.id === "pdf-converter"
            ? Array.from(pdfConverterAllowedMimeTypes)
            : selectedTool?.allowedFileTypes
        }
        submitButtonText="Convert"
      />

      {/* Format Selection Modal */}
      <FormatSelectionModal
        isOpen={isFormatModalOpen}
        onClose={handleCloseFormatModal}
        onFormatSelect={handleFormatSelect}
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

