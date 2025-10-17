"use client";

import { useTranslations } from "next-intl";

interface ConversionResult {
  fileUrl: string;
  fileName: string;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  result: ConversionResult;
}

export default function SuccessModal({
  isOpen,
  onClose,
  onDownload,
  result
}: SuccessModalProps) {
  const t = useTranslations("SuccessModal");
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000aa] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {t("title")}
          </h2>
          <button
            onClick={onClose}
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
            {t("message")}
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 mb-1">{t("fileName")}</p>
            <p className="text-gray-900 font-medium break-all">
              {result.fileName}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onDownload}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
          >
            {t("downloadAgain")}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 px-4 rounded-md font-medium transition-colors"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
