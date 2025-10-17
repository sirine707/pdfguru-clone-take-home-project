"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Header from "./Header";
import FileUploadModal from "./FileUploadModal";
import FormatSelectionModal from "./FormatSelectionModal";
import LoadingModal from "./LoadingModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

interface ConversionTool {
  id: string;
  icon: string;
  bgColor: string;
  allowedFileTypes?: string[];
}

// Helper function to convert tool ID to translation key
const getTranslationKey = (toolId: string): string => {
  return toolId
    .split('-')
    .map((part, index) => 
      index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join('');
};

// Convert from PDF tools
const convertFromPdfTools: ConversionTool[] = [
  { id: "pdf-converter", icon: "📄", bgColor: "bg-red-100", allowedFileTypes: [] },
  { id: "pdf-to-word", icon: "📝", bgColor: "bg-blue-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-png", icon: "🖼️", bgColor: "bg-orange-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-jpg", icon: "🖼️", bgColor: "bg-pink-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-excel", icon: "📊", bgColor: "bg-green-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-pptx", icon: "📽️", bgColor: "bg-orange-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-azw3", icon: "📚", bgColor: "bg-yellow-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-docx", icon: "📄", bgColor: "bg-purple-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-mobi", icon: "📱", bgColor: "bg-blue-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-text", icon: "📝", bgColor: "bg-purple-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-tiff", icon: "🖼️", bgColor: "bg-teal-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-dxf", icon: "🎯", bgColor: "bg-orange-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-html", icon: "🌐", bgColor: "bg-green-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-eps", icon: "📐", bgColor: "bg-blue-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-webp", icon: "📷", bgColor: "bg-purple-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-epub", icon: "📖", bgColor: "bg-green-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-image", icon: "🖼️", bgColor: "bg-purple-100", allowedFileTypes: ["application/pdf"] },
  { id: "pdf-to-svg", icon: "🎨", bgColor: "bg-pink-100", allowedFileTypes: ["application/pdf"] },
];

// Convert to PDF tools
const convertToPdfTools: ConversionTool[] = [
  { id: "pdf-converter", icon: "📄", bgColor: "bg-pink-100", allowedFileTypes: [] },
  { id: "word-to-pdf", icon: "📝", bgColor: "bg-blue-100", allowedFileTypes: ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"] },
  { id: "png-to-pdf", icon: "🖼️", bgColor: "bg-orange-100", allowedFileTypes: ["image/png"] },
  { id: "jpg-to-pdf", icon: "🖼️", bgColor: "bg-pink-100", allowedFileTypes: ["image/jpeg"] },
  { id: "excel-to-pdf", icon: "📊", bgColor: "bg-green-100", allowedFileTypes: ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"] },
  { id: "pptx-to-pdf", icon: "📽️", bgColor: "bg-orange-100", allowedFileTypes: ["application/vnd.openxmlformats-officedocument.presentationml.presentation"] },
  { id: "azw3-to-pdf", icon: "📚", bgColor: "bg-yellow-100", allowedFileTypes: ["application/vnd.amazon.ebook"] },
  { id: "csv-to-pdf", icon: "📄", bgColor: "bg-blue-100", allowedFileTypes: ["text/csv"] },
  { id: "djvu-to-pdf", icon: "📎", bgColor: "bg-purple-100", allowedFileTypes: ["image/vnd.djvu", "image/x-djvu"] },
  { id: "docx-to-pdf", icon: "📄", bgColor: "bg-pink-100", allowedFileTypes: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"] },
  { id: "dwg-to-pdf", icon: "➕", bgColor: "bg-cyan-100", allowedFileTypes: ["image/vnd.dwg", "application/acad"] },
  { id: "dxf-to-pdf", icon: "⚙️", bgColor: "bg-orange-100", allowedFileTypes: ["application/dxf", "image/vnd.dxf"] },
  { id: "eps-to-pdf", icon: "👥", bgColor: "bg-blue-100", allowedFileTypes: ["application/postscript"] },
  { id: "epub-to-pdf", icon: "✅", bgColor: "bg-green-100", allowedFileTypes: ["application/epub+zip"] },
  { id: "image-to-pdf", icon: "🖼️", bgColor: "bg-purple-100", allowedFileTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"] },
  { id: "html-to-pdf", icon: "🌐", bgColor: "bg-green-100", allowedFileTypes: ["text/html"] },
  { id: "mobi-to-pdf", icon: "📱", bgColor: "bg-blue-100", allowedFileTypes: ["application/x-mobipocket-ebook"] },
  { id: "svg-to-pdf", icon: "🎨", bgColor: "bg-pink-100", allowedFileTypes: ["image/svg+xml"] },
  { id: "text-to-pdf", icon: "📝", bgColor: "bg-purple-100", allowedFileTypes: ["text/plain"] },
  { id: "tiff-to-pdf", icon: "🖼️", bgColor: "bg-blue-100", allowedFileTypes: ["image/tiff"] },
  { id: "webp-to-pdf", icon: "📷", bgColor: "bg-pink-100", allowedFileTypes: ["image/webp"] },
  { id: "avif-to-pdf", icon: "🎬", bgColor: "bg-orange-100", allowedFileTypes: ["image/avif"] },
  { id: "heic-to-pdf", icon: "📱", bgColor: "bg-pink-100", allowedFileTypes: ["image/heic", "image/heif"] },
  { id: "cbr-to-pdf", icon: "📚", bgColor: "bg-purple-100", allowedFileTypes: ["application/x-cbr"] },
  { id: "rtf-to-pdf", icon: "📄", bgColor: "bg-pink-100", allowedFileTypes: ["application/rtf"] },
  { id: "xps-to-pdf", icon: "📄", bgColor: "bg-orange-100", allowedFileTypes: ["application/vnd.ms-xpsdocument"] },
];

// Other Formats tools
const otherFormatsTools: ConversionTool[] = [
  { id: "avif-to-jpg", icon: "🖼️", bgColor: "bg-cyan-100", allowedFileTypes: ["image/avif"] },
  { id: "avif-to-png", icon: "🖼️", bgColor: "bg-purple-100", allowedFileTypes: ["image/avif"] },
  { id: "webp-to-png", icon: "📷", bgColor: "bg-cyan-100", allowedFileTypes: ["image/webp"] },
  { id: "epub-to-mobi", icon: "📖", bgColor: "bg-cyan-100", allowedFileTypes: ["application/epub+zip"] },
  { id: "csv-to-excel", icon: "📊", bgColor: "bg-cyan-100", allowedFileTypes: ["text/csv"] },
  { id: "dwg-to-dxf", icon: "🔲", bgColor: "bg-purple-100", allowedFileTypes: ["image/vnd.dwg", "application/acad"] },
  { id: "gif-to-jpg", icon: "📷", bgColor: "bg-purple-100", allowedFileTypes: ["image/gif"] },
  { id: "gif-to-png", icon: "📷", bgColor: "bg-orange-100", allowedFileTypes: ["image/gif"] },
  { id: "jpeg-to-jpg", icon: "🖼️", bgColor: "bg-orange-100", allowedFileTypes: ["image/jpeg"] },
  { id: "heic-to-jpg", icon: "🖼️", bgColor: "bg-purple-100", allowedFileTypes: ["image/heic", "image/heif"] },
  { id: "heic-to-png", icon: "🖼️", bgColor: "bg-orange-100", allowedFileTypes: ["image/heic", "image/heif"] },
  { id: "jpg-to-png", icon: "🖼️", bgColor: "bg-yellow-100", allowedFileTypes: ["image/jpeg"] },
  { id: "png-to-jpg", icon: "🖼️", bgColor: "bg-yellow-100", allowedFileTypes: ["image/png"] },
  { id: "svg-to-jpg", icon: "🖼️", bgColor: "bg-orange-100", allowedFileTypes: ["image/svg+xml"] },
  { id: "webp-to-jpg", icon: "📷", bgColor: "bg-cyan-100", allowedFileTypes: ["image/webp"] },
  { id: "word-to-jpg", icon: "📄", bgColor: "bg-blue-100", allowedFileTypes: ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"] },
  { id: "png-to-webp", icon: "🖼️", bgColor: "bg-cyan-100", allowedFileTypes: ["image/png"] },
  { id: "svg-to-png", icon: "🌊", bgColor: "bg-orange-100", allowedFileTypes: ["image/svg+xml"] },
];

const pdfConverterAllowedMimeTypes = new Set<string>([
  "application/pdf",
  ...convertToPdfTools
    .map((tool) => tool.allowedFileTypes || ([] as string[]))
    .flat(),
]);

export default function ConverterModule() {
  const t = useTranslations("ConverterModule");
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
    setSelectedTool(tool);
    setIsModalOpen(true);
    setConversionResult(null);
    setConversionError(null);
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
        setConversionError(t("errors.invalidFileType"));
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
          data.message || t("errors.conversionFailed")
        );
      }
    } catch (error) {
      console.error("Conversion error:", error);
      setConversionError(
        t("errors.conversionError")
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
          data.message || t("errors.conversionFailed")
        );
      }
    } catch (error) {
      console.error("Conversion error:", error);
      setConversionError(
        t("errors.conversionError")
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
          <h1 className="text-4xl font-bold text-black">{t("title")}</h1>
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
              {t("tabs.convertFromPdf")}
            </button>
            <button
              onClick={() => setActiveTab("to")}
              className={`pb-4 font-medium transition-colors ${
                activeTab === "to"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {t("tabs.convertToPdf")}
            </button>
            <button
              onClick={() => setActiveTab("other")}
              className={`pb-4 font-medium transition-colors ${
                activeTab === "other"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {t("tabs.otherFormats")}
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
                {/* <div className="text-2xl">{tool.icon}</div> */}
                <div className="text-black font-medium">{t(`tools.${getTranslationKey(tool.id)}`)}</div>
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
        submitButtonText={t("button")}
      />

      {/* Format Selection Modal */}
      <FormatSelectionModal
        isOpen={isFormatModalOpen}
        onClose={handleCloseFormatModal}
        onFormatSelect={handleFormatSelect}
      />

      {/* Loading Modal */}
      <LoadingModal isOpen={isConverting} />

      {/* Success Modal */}
      <SuccessModal
        isOpen={!!conversionResult}
        onClose={handleCloseResult}
        onDownload={() =>
          conversionResult &&
          downloadFile(conversionResult.fileUrl, conversionResult.fileName)
        }
        result={conversionResult || { fileUrl: "", fileName: "" }}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={!!conversionError}
        onClose={handleCloseResult}
        error={conversionError || ""}
      />
    </div>
  );
}

