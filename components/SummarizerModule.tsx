"use client";

import Header from "./Header";

export default function SummarizerModule() {
  return (
    <div className="min-h-screen bg-white">
      <Header activePage="summarizer" />

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">AI PDF Summarizer</h1>
          <p className="text-lg text-gray-600">
            Extract key insights and summaries from your PDF documents using advanced AI technology
          </p>
        </div>

        {/* Main Upload Area */}
        <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center mb-8">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your PDF document</h3>
            <p className="text-gray-600">Drag and drop your PDF here, or click to browse</p>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition-colors">
            Choose File
          </button>
          <p className="text-sm text-gray-500 mt-4">Maximum file size: 10MB</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">Advanced machine learning algorithms extract meaningful insights from your documents</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Processing</h3>
            <p className="text-gray-600">Get comprehensive summaries in seconds, not hours of manual reading</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Formats</h3>
            <p className="text-gray-600">Export summaries as text, bullet points, or structured reports</p>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-semibold text-gray-900 mb-2">Upload PDF</h3>
              <p className="text-gray-600 text-sm">Upload your PDF document to our secure platform</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">Our AI reads and analyzes the content</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-semibold text-gray-900 mb-2">Generate Summary</h3>
              <p className="text-gray-600 text-sm">Key points and insights are extracted</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-semibold text-gray-900 mb-2">Download Results</h3>
              <p className="text-gray-600 text-sm">Get your summary in your preferred format</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
