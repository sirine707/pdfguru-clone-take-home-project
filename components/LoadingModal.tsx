"use client";

interface LoadingModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
}

export default function LoadingModal({
  isOpen,
  title = "Converting...",
  message = "Please wait while we convert your file"
}: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000aa] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-center">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
