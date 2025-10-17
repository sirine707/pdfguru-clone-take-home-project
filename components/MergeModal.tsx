"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

interface FileWithPreview {
  file: File;
  id: string;
  preview?: string;
}

interface MergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMerge: (files: File[]) => void;
}

export default function MergeModal({
  isOpen,
  onClose,
  onMerge,
}: MergeModalProps) {
  const t = useTranslations("MergeModal");
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedFiles([]);
      setMessage(null);
      setDraggedIndex(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    processFiles(files);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const processFiles = (files: File[]) => {
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    // Check if adding these files would exceed the 15 file limit
    const currentCount = selectedFiles.length;
    const availableSlots = 15 - currentCount;

    if (availableSlots <= 0) {
      setMessage(
        t("errors.maxFiles")
      );
      setTimeout(() => setMessage(null), 5000);
      return;
    }

    // Only add files up to the limit
    const filesToAdd = pdfFiles.slice(0, availableSlots);

    if (filesToAdd.length < pdfFiles.length) {
      setMessage(
        `${filesToAdd.length} ${t("errors.maxFilesPartial")}`
      );
      setTimeout(() => setMessage(null), 5000);
    } else {
      setMessage(null); // Clear any existing message
    }

    const newFiles: FileWithPreview[] = filesToAdd.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
    }));

    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
  };

  // Drag and drop reordering functions
  const handleFileDragStart = (event: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleFileDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleFileDrop = (event: React.DragEvent, dropIndex: number) => {
    event.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newFiles = [...selectedFiles];
    const draggedFile = newFiles[draggedIndex];

    // Remove the dragged file from its original position
    newFiles.splice(draggedIndex, 1);

    // Insert it at the new position
    newFiles.splice(dropIndex, 0, draggedFile);

    setSelectedFiles(newFiles);
    setDraggedIndex(null);
  };

  const handleFileDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleAddFiles = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (fileId: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleMerge = () => {
    if (selectedFiles.length > 0) {
      onMerge(selectedFiles.map((f) => f.file));
    }
  };

  const truncateFileName = (fileName: string, maxLength: number = 30) => {
    if (fileName.length <= maxLength) return fileName;
    return fileName.substring(0, maxLength) + "...";
  };

  return (
    <div className="fixed inset-0 bg-[#000000aa] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
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

        {/* Instructions */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            {t("instructions")}
          </p>
          {selectedFiles.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {t("selectedFiles")}: {selectedFiles.length}
            </p>
          )}
        </div>

        {/* File Display Area */}
        <div className="mb-6">
          {selectedFiles.length === 0 ? (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
              onClick={handleAddFiles}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg font-medium">
                {t("addFiles")}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {t("selectFiles")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedFiles.map((fileWithPreview, index) => (
                <div
                  key={fileWithPreview.id}
                  draggable
                  onDragStart={(e) => handleFileDragStart(e, index)}
                  onDragOver={handleFileDragOver}
                  onDrop={(e) => handleFileDrop(e, index)}
                  onDragEnd={handleFileDragEnd}
                  className={`bg-gray-50 rounded-lg p-4 border border-gray-200 relative group hover:shadow-md transition-all cursor-move ${
                    draggedIndex === index ? "opacity-50 scale-95" : ""
                  }`}
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => handleRemoveFile(fileWithPreview.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>

                  {/* File Preview */}
                  <div className="bg-white rounded border p-4 mb-3 h-32 flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-12 h-12 text-red-500 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-xs text-gray-500">{t("pdfDocument")}</p>
                    </div>
                  </div>

                  {/* File Name */}
                  <p className="text-sm text-gray-900 font-medium truncate">
                    {truncateFileName(fileWithPreview.file.name)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(fileWithPreview.file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Message Display */}
        {message && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <p className="text-yellow-800 text-sm">{message}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between">
            <button
              onClick={handleAddFiles}
              disabled={selectedFiles.length >= 15}
              className="bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              {t("addButton")} {selectedFiles.length >= 15 && t("maxReached")}
            </button>
            <button
              onClick={handleMerge}
              disabled={selectedFiles.length < 2}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              {t("mergeButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
