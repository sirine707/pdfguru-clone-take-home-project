"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "../lib/navigation";
import Header from "./Header";
import { useFile } from "../contexts/FileContext";

export default function EditorModule() {
  const t = useTranslations("EditorModule");
  const containerRef = useRef(null);
  const { selectedFile } = useFile();
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;

    if (container && window.NutrientViewer && selectedFile) {
      const documentSource = URL.createObjectURL(selectedFile);

      window.NutrientViewer.load({
        container,
        document: documentSource,
      });
    }

    return () => {
      if (window.NutrientViewer && container) {
        window.NutrientViewer.unload(container);
      }
    };
  }, [selectedFile]);

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="edit-sign" />

      {!selectedFile ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center p-8">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t("noFile.title")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("noFile.message")}
            </p>
            <button
              onClick={() => router.push("/edit-sign")}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md font-medium transition-colors"
            >
              {t("noFile.button")}
            </button>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          style={{
            height: "80vh",
            width: "100%",
          }}
          className="max-w-7xl my-4 mx-auto px-4 sm:px-6 lg:px-8"
        />
      )}
    </div>
  );
}

