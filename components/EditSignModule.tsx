"use client";

import Header from "./Header";

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
  { id: "extract", name: "Extract PDF Pages", icon: "📤", bgColor: "bg-pink-100" },
  { id: "delete", name: "Delete PDF Pages", icon: "🗑️", bgColor: "bg-pink-100" },
  { id: "fill", name: "Fill Out PDF", icon: "✍️", bgColor: "bg-pink-100" },
  { id: "rotate", name: "Rotate PDF", icon: "🔄", bgColor: "bg-pink-100" },
  { id: "create", name: "Create PDF", icon: "➕", bgColor: "bg-pink-100" },
  { id: "organize", name: "Organize PDF", icon: "📋", bgColor: "bg-pink-100" },
  { id: "sign", name: "Sign PDF", icon: "✍️", bgColor: "bg-pink-100" },
  { id: "password", name: "Password Protect PDF", icon: "🔒", bgColor: "bg-pink-100" },
  { id: "ocr", name: "OCR PDF", icon: "👁️", bgColor: "bg-pink-100" },
  { id: "crop", name: "Crop PDF", icon: "✂️", bgColor: "bg-pink-100" },
];

export default function EditSignModule() {
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
