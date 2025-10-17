"use client";

import { useEffect, useState, useRef } from "react";
import Header from "./Header";

export default function SummarizerEditorModule() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the PDF
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="summarizer" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Processing your PDF...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - PDF Viewer */}
            <div className="bg-white rounded-lg border border-gray-200 h-[80vh] flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">
                  Document Preview
                </h2>
              </div>

              {/* PDF Content */}
              <div className="flex-1 bg-gray-50 rounded border border-gray-300 m-4 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg
                    className="mx-auto h-16 w-16 mb-4"
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
                  <p>PDF Document</p>
                  <p className="text-sm mt-2">
                    PDF viewer will be initialized here
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Summary Panel */}
            <div className="bg-white rounded-lg border border-gray-200 h-[80vh] flex flex-col">
              {/* Header with P icon and title */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900">
                    AI Summary
                  </h2>
                </div>
              </div>

              {/* Summary Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {/* Professional Experience Section */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Professional Experience:
                    </h3>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>
                        • Developed real-time product search features and
                        containerized applications for deployment.
                      </li>
                      <li>
                        • Contributed to CRM and microservices projects,
                        improving efficiency and performance.
                      </li>
                    </ul>
                  </div>

                  {/* Skills Section */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Skills:</h3>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>
                        • Proficient in Python, Docker, AWS, and various
                        frameworks like Django and React.
                      </li>
                    </ul>
                  </div>

                  {/* Projects Section */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Projects:</h3>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>
                        • Created AI-powered platforms and real-time chat
                        applications.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Write your message here"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors">
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
                        d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

