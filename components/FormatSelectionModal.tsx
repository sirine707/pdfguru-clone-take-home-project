"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface FormatOption {
  id: string;
  icon: string;
  color: string;
}

interface FormatSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFormatSelect: (format: string) => void;
}

const formatOptions: FormatOption[] = [
  {
    id: "word",
    icon: "📄",
    color: "bg-blue-100 border-blue-200 text-blue-800"
  },
  {
    id: "jpg",
    icon: "🖼️",
    color: "bg-pink-100 border-pink-200 text-pink-800"
  },
  {
    id: "excel",
    icon: "📊",
    color: "bg-green-100 border-green-200 text-green-800"
  },
  {
    id: "png",
    icon: "🖼️",
    color: "bg-orange-100 border-orange-200 text-orange-800"
  },
  {
    id: "epub",
    icon: "📖",
    color: "bg-green-100 border-green-200 text-green-800"
  },
  {
    id: "pptx",
    icon: "📽️",
    color: "bg-orange-100 border-orange-200 text-orange-800"
  }
];

export default function FormatSelectionModal({
  isOpen,
  onClose,
  onFormatSelect
}: FormatSelectionModalProps) {
  const t = useTranslations("FormatSelectionModal");
  const [selectedFormat, setSelectedFormat] = useState<string>("word");

  if (!isOpen) return null;

  const handleFormatSelect = (formatId: string) => {
    setSelectedFormat(formatId);
  };

  const handleDownload = () => {
    onFormatSelect(selectedFormat);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#000000aa] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
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

        {/* Prompt */}
        <p className="text-gray-700 mb-6 text-center">
          {t("prompt")}
        </p>

        {/* Format Options Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {formatOptions.map((format) => (
            <button
              key={format.id}
              onClick={() => handleFormatSelect(format.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedFormat === format.id
                  ? `${format.color} border-current`
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedFormat === format.id
                    ? "bg-current border-current"
                    : "border-gray-300"
                }`}>
                  {selectedFormat === format.id && (
                    <div className="w-full h-full rounded-full bg-current"></div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {/* <span className="text-lg">{format.icon}</span> */}
                  <span className="font-medium text-gray-900">{t(`formats.${format.id}`)}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-gray-300 text-gray-900 py-2 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
          >
            {t("download")}
          </button>
        </div>
      </div>
    </div>
  );
}
