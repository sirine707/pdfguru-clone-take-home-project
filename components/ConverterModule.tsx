"use client";

import { useState } from "react";
import Header from "./Header";

interface ConversionTool {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
}

// Convert from PDF tools
const convertFromPdfTools: ConversionTool[] = [
  { id: "pdf-converter", name: "PDF Converter", icon: "📄", bgColor: "bg-red-100" },
  { id: "pdf-to-word", name: "PDF to Word", icon: "📝", bgColor: "bg-blue-100" },
  { id: "pdf-to-png", name: "PDF to PNG", icon: "🖼️", bgColor: "bg-orange-100" },
  { id: "pdf-to-jpg", name: "PDF to JPG", icon: "🖼️", bgColor: "bg-pink-100" },
  { id: "pdf-to-excel", name: "PDF to Excel", icon: "📊", bgColor: "bg-green-100" },
  { id: "pdf-to-pptx", name: "PDF to PPTX", icon: "📽️", bgColor: "bg-orange-100" },
  { id: "pdf-to-azw3", name: "PDF to AZW3", icon: "📚", bgColor: "bg-yellow-100" },
  { id: "pdf-to-docx", name: "PDF to DOCX", icon: "📄", bgColor: "bg-purple-100" },
  { id: "pdf-to-mobi", name: "PDF to MOBI", icon: "📱", bgColor: "bg-blue-100" },
  { id: "pdf-to-text", name: "PDF to Text", icon: "📝", bgColor: "bg-purple-100" },
  { id: "pdf-to-tiff", name: "PDF to TIFF", icon: "🖼️", bgColor: "bg-teal-100" },
  { id: "pdf-to-dxf", name: "PDF to DXF", icon: "🎯", bgColor: "bg-orange-100" },
  { id: "pdf-to-html", name: "PDF to HTML", icon: "🌐", bgColor: "bg-green-100" },
  { id: "pdf-to-eps", name: "PDF to EPS", icon: "📐", bgColor: "bg-blue-100" },
  { id: "pdf-to-webp", name: "PDF to WebP", icon: "📷", bgColor: "bg-purple-100" },
  { id: "pdf-to-epub", name: "PDF to EPUB", icon: "📖", bgColor: "bg-green-100" },
  { id: "pdf-to-image", name: "PDF to Image", icon: "🖼️", bgColor: "bg-purple-100" },
  { id: "pdf-to-svg", name: "PDF to SVG", icon: "🎨", bgColor: "bg-pink-100" },
];

// Convert to PDF tools
const convertToPdfTools: ConversionTool[] = [
  { id: "pdf-converter", name: "PDF Converter", icon: "📄", bgColor: "bg-pink-100" },
  { id: "word-to-pdf", name: "Word to PDF", icon: "📝", bgColor: "bg-blue-100" },
  { id: "png-to-pdf", name: "PNG to PDF", icon: "🖼️", bgColor: "bg-orange-100" },
  { id: "jpg-to-pdf", name: "JPG to PDF", icon: "🖼️", bgColor: "bg-pink-100" },
  { id: "excel-to-pdf", name: "Excel to PDF", icon: "📊", bgColor: "bg-green-100" },
  { id: "pptx-to-pdf", name: "PPTX to PDF", icon: "📽️", bgColor: "bg-orange-100" },
  { id: "azw3-to-pdf", name: "AZW3 to PDF", icon: "📚", bgColor: "bg-yellow-100" },
  { id: "csv-to-pdf", name: "CSV to PDF", icon: "📄", bgColor: "bg-blue-100" },
  { id: "djvu-to-pdf", name: "DjVu to PDF", icon: "📎", bgColor: "bg-purple-100" },
  { id: "docx-to-pdf", name: "DOCX to PDF", icon: "📄", bgColor: "bg-pink-100" },
  { id: "dwg-to-pdf", name: "DWG to PDF", icon: "➕", bgColor: "bg-cyan-100" },
  { id: "dxf-to-pdf", name: "DXF to PDF", icon: "⚙️", bgColor: "bg-orange-100" },
  { id: "eps-to-pdf", name: "EPS to PDF", icon: "👥", bgColor: "bg-blue-100" },
  { id: "epub-to-pdf", name: "EPUB to PDF", icon: "✅", bgColor: "bg-green-100" },
  { id: "image-to-pdf", name: "Image to PDF", icon: "🖼️", bgColor: "bg-purple-100" },
  { id: "html-to-pdf", name: "HTML to PDF", icon: "🌐", bgColor: "bg-green-100" },
  { id: "mobi-to-pdf", name: "MOBI to PDF", icon: "📱", bgColor: "bg-blue-100" },
  { id: "svg-to-pdf", name: "SVG to PDF", icon: "🎨", bgColor: "bg-pink-100" },
  { id: "text-to-pdf", name: "Text to PDF", icon: "📝", bgColor: "bg-purple-100" },
  { id: "tiff-to-pdf", name: "TIFF to PDF", icon: "🖼️", bgColor: "bg-blue-100" },
  { id: "webp-to-pdf", name: "WebP to PDF", icon: "📷", bgColor: "bg-pink-100" },
  { id: "avif-to-pdf", name: "Avif to PDF", icon: "🎬", bgColor: "bg-orange-100" },
  { id: "heic-to-pdf", name: "Heic to PDF", icon: "📱", bgColor: "bg-pink-100" },
  { id: "cbr-to-pdf", name: "CBR to PDF", icon: "📚", bgColor: "bg-purple-100" },
  { id: "rtf-to-pdf", name: "RTF to PDF", icon: "📄", bgColor: "bg-pink-100" },
  { id: "xps-to-pdf", name: "XPS to PDF", icon: "📄", bgColor: "bg-orange-100" },
];

// Other Formats tools
const otherFormatsTools: ConversionTool[] = [
  { id: "compress-pdf", name: "Compress PDF", icon: "📦", bgColor: "bg-blue-100" },
  { id: "merge-pdf", name: "Merge PDF", icon: "📄", bgColor: "bg-green-100" },
  { id: "split-pdf", name: "Split PDF", icon: "✂️", bgColor: "bg-orange-100" },
  { id: "rotate-pdf", name: "Rotate PDF", icon: "🔄", bgColor: "bg-purple-100" },
  { id: "watermark-pdf", name: "Watermark PDF", icon: "💧", bgColor: "bg-cyan-100" },
  { id: "protect-pdf", name: "Protect PDF", icon: "🔒", bgColor: "bg-red-100" },
  { id: "unlock-pdf", name: "Unlock PDF", icon: "🔓", bgColor: "bg-green-100" },
  { id: "repair-pdf", name: "Repair PDF", icon: "🔧", bgColor: "bg-yellow-100" },
];

export default function ConverterModule() {
  const [activeTab, setActiveTab] = useState<'from' | 'to' | 'other'>('from');

  const getCurrentTools = () => {
    switch (activeTab) {
      case 'from':
        return convertFromPdfTools;
      case 'to':
        return convertToPdfTools;
      case 'other':
        return otherFormatsTools;
      default:
        return convertFromPdfTools;
    }
  };

  const getCurrentTabName = () => {
    switch (activeTab) {
      case 'from':
        return 'Convert from PDF';
      case 'to':
        return 'Convert to PDF';
      case 'other':
        return 'Other Formats';
      default:
        return 'Convert from PDF';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="converter" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black">PDF Converter Tool</h1>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-8 border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('from')}
              className={`pb-4 font-medium transition-colors ${
                activeTab === 'from' 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Convert from PDF
            </button>
            <button 
              onClick={() => setActiveTab('to')}
              className={`pb-4 font-medium transition-colors ${
                activeTab === 'to' 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Convert to PDF
            </button>
            <button 
              onClick={() => setActiveTab('other')}
              className={`pb-4 font-medium transition-colors ${
                activeTab === 'other' 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Other Formats
            </button>
          </div>
        </div>

        {/* Conversion Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {getCurrentTools().map((tool) => (
            <div
              key={tool.id}
              className={`${tool.bgColor} rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{tool.icon}</div>
                <div className="text-black font-medium">{tool.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
