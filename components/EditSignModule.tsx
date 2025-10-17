"use client";

import { useState } from "react";
import { useRouter } from "../lib/navigation";
import Header from "./Header";
import FileUploadModal from "./FileUploadModal";
import LoadingModal from "./LoadingModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import MergeModal from "./MergeModal";
import { useFile } from "../contexts/FileContext";

interface Tool {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
}

const tools: Tool[] = [
  { id: "edit", name: "Edit PDF", icon: "✏️", bgColor: "bg-pink-100" },
  { id: "compress", name: "Compress PDF", icon: "📦", bgColor: "bg-pink-100" },
  { id: "split", name: "Split PDF", icon: "✂️", bgColor: "bg-pink-100" },
  { id: "merge", name: "Merge PDF", icon: "📄", bgColor: "bg-pink-100" },
  { id: "annotate", name: "Annotate PDF", icon: "💬", bgColor: "bg-pink-100" },
  {
    id: "extract",
    name: "Extract PDF Pages",
    icon: "📤",
    bgColor: "bg-pink-100",
  },
  {
    id: "delete",
    name: "Delete PDF Pages",
    icon: "🗑️",
    bgColor: "bg-pink-100",
  },
  { id: "fill", name: "Fill Out PDF", icon: "✍️", bgColor: "bg-pink-100" },
  { id: "rotate", name: "Rotate PDF", icon: "🔄", bgColor: "bg-pink-100" },
  { id: "create", name: "Create PDF", icon: "➕", bgColor: "bg-pink-100" },
  { id: "organize", name: "Organize PDF", icon: "📋", bgColor: "bg-pink-100" },
  { id: "sign", name: "Sign PDF", icon: "✍️", bgColor: "bg-pink-100" },
  {
    id: "password",
    name: "Password Protect PDF",
    icon: "🔒",
    bgColor: "bg-pink-100",
  },
  { id: "ocr", name: "OCR PDF", icon: "👁️", bgColor: "bg-pink-100" },
  { id: "crop", name: "Crop PDF", icon: "✂️", bgColor: "bg-pink-100" },
];

export default function EditSignModule() {
  const router = useRouter();
  const { setSelectedFile } = useFile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | undefined>(
    undefined
  );
  const [isConverting, setIsConverting] = useState(false);
  const [conversionResult, setConversionResult] = useState<{
    fileUrl: string;
    fileName: string;
  } | null>(null);
  const [conversionError, setConversionError] = useState<string | null>(null);
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);

    switch (toolId) {
      case "create":
        const emptyPdf = new File(
          [
            new Uint8Array([
              0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x31, 0x20,
              0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x54, 0x79,
              0x70, 0x65, 0x2f, 0x43, 0x61, 0x74, 0x61, 0x6c, 0x6f, 0x67, 0x2f,
              0x50, 0x61, 0x67, 0x65, 0x73, 0x20, 0x32, 0x20, 0x30, 0x20, 0x52,
              0x3e, 0x3e, 0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x32,
              0x20, 0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x54,
              0x79, 0x70, 0x65, 0x2f, 0x50, 0x61, 0x67, 0x65, 0x73, 0x2f, 0x43,
              0x6f, 0x75, 0x6e, 0x74, 0x20, 0x31, 0x2f, 0x4b, 0x69, 0x64, 0x73,
              0x5b, 0x33, 0x20, 0x30, 0x20, 0x52, 0x5d, 0x3e, 0x3e, 0x0a, 0x65,
              0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x33, 0x20, 0x30, 0x20, 0x6f,
              0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x54, 0x79, 0x70, 0x65, 0x2f,
              0x50, 0x61, 0x67, 0x65, 0x2f, 0x50, 0x61, 0x72, 0x65, 0x6e, 0x74,
              0x20, 0x32, 0x20, 0x30, 0x20, 0x52, 0x2f, 0x52, 0x65, 0x73, 0x6f,
              0x75, 0x72, 0x63, 0x65, 0x73, 0x3c, 0x3c, 0x3e, 0x3e, 0x2f, 0x4d,
              0x65, 0x64, 0x69, 0x61, 0x42, 0x6f, 0x78, 0x5b, 0x30, 0x20, 0x30,
              0x20, 0x36, 0x31, 0x32, 0x20, 0x37, 0x39, 0x32, 0x5d, 0x3e, 0x3e,
              0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x78, 0x72, 0x65,
              0x66, 0x0a, 0x30, 0x20, 0x34, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x30,
              0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x36, 0x35, 0x35, 0x33, 0x35,
              0x20, 0x66, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30,
              0x31, 0x30, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x0a,
              0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x37, 0x39, 0x20,
              0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x0a, 0x30, 0x30, 0x30,
              0x30, 0x30, 0x30, 0x30, 0x31, 0x37, 0x33, 0x20, 0x30, 0x30, 0x30,
              0x30, 0x30, 0x20, 0x6e, 0x0a, 0x74, 0x72, 0x61, 0x69, 0x6c, 0x65,
              0x72, 0x0a, 0x3c, 0x3c, 0x2f, 0x53, 0x69, 0x7a, 0x65, 0x20, 0x34,
              0x2f, 0x52, 0x6f, 0x6f, 0x74, 0x20, 0x31, 0x20, 0x30, 0x20, 0x52,
              0x3e, 0x3e, 0x0a, 0x73, 0x74, 0x61, 0x72, 0x74, 0x78, 0x72, 0x65,
              0x66, 0x0a, 0x34, 0x30, 0x38, 0x0a, 0x25, 0x25, 0x45, 0x4f, 0x46,
            ]),
          ],
          "New.pdf",
          { type: "application/pdf" }
        );
        setSelectedFile(emptyPdf);
        router.push(`/edit-sign/editor?tool=${toolId}`);
        break;

      case "compress":
        setIsModalOpen(true);
        break;

      case "merge":
        setIsMergeModalOpen(true);
        break;

      case "ocr":
        setIsModalOpen(true);
        break;

      default:
        setIsModalOpen(true);
        break;
    }
  };

  const handleFileSelect = async (file: File) => {
    switch (selectedTool) {
      case "compress":
        await handleFormatSelect(file, "compress");
        break;
      case "ocr":
        await handleFormatSelect(file, "ocr");
        break;
      default:
        setSelectedFile(file);
        router.push(`/edit-sign/editor?tool=${selectedTool}`);
        break;
    }
  };

  const handleFormatSelect = async (file: File, toolId: string) => {
    setIsConverting(true);
    setConversionError(null);
    setIsModalOpen(false);

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
          data.message ||
            `${
              toolId === "compress" ? "Compression" : "OCR"
            } failed. Please try again.`
        );
      }
    } catch (error) {
      console.error(`${toolId} error:`, error);
      setConversionError(
        `An error occurred during ${
          toolId === "compress" ? "compression" : "OCR"
        }. Please try again.`
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

  const handleCloseResult = () => {
    setConversionResult(null);
    setConversionError(null);
  };

  const handleMerge = async (files: File[]) => {
    setIsConverting(true);
    setConversionError(null);
    setIsMergeModalOpen(false);

    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });

      const response = await fetch(
        `http://localhost:4000/converter/convert/merge`,
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
        setConversionError(data.message || "Merge failed. Please try again.");
      }
    } catch (error) {
      console.error("Merge error:", error);
      setConversionError("An error occurred during merge. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="edit-sign" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black">Edit & Sign PDF</h1>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className={`${tool.bgColor} rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex items-center space-x-4">
                {/* <div className="text-2xl">{tool.icon}</div> */}
                <div className="text-black font-medium">{tool.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FileUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFileSelect={handleFileSelect}
        allowedFileTypes={
          selectedTool === "compress" || selectedTool === "ocr"
            ? ["application/pdf"]
            : undefined
        }
        submitButtonText={
          selectedTool === "compress"
            ? "Compress"
            : selectedTool === "ocr"
            ? "OCR"
            : "Upload"
        }
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

      {/* Merge Modal */}
      <MergeModal
        isOpen={isMergeModalOpen}
        onClose={() => setIsMergeModalOpen(false)}
        onMerge={handleMerge}
      />
    </div>
  );
}

