"use client";

import { useTranslations } from "next-intl";

interface LoadingModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
}

export default function LoadingModal({
  isOpen,
  title,
  message
}: LoadingModalProps) {
  const t = useTranslations("LoadingModal");
  
  if (!isOpen) return null;

  const displayTitle = title || t("defaultTitle");
  const displayMessage = message || t("defaultMessage");

  return (
    <div className="fixed inset-0 bg-[#000000aa] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {displayTitle}
          </h3>
          <p className="text-gray-600 text-center">
            {displayMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
