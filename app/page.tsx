"use client";

import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  const modules = [
    {
      title: "Edit & Sign PDF",
      description:
        "Edit, annotate, compress, split, merge, and sign your PDF documents with ease.",
      href: "/edit-sign",
      icon: "✏️",
      features: [
        "Edit PDF",
        "Compress PDF",
        "Split PDF",
        "Merge PDF",
        "Sign PDF",
        "Annotate PDF",
      ],
    },
    {
      title: "PDF Converter Tool",
      description:
        "Convert PDFs to various formats or convert other formats to PDF.",
      href: "/converter",
      icon: "🔄",
      features: [
        "PDF to Word",
        "PDF to Image",
        "Word to PDF",
        "Image to PDF",
        "Excel to PDF",
      ],
    },
    {
      title: "AI PDF Summarizer",
      description:
        "Extract key insights and summaries from your PDF documents using AI.",
      href: "/summarizer",
      icon: "🤖",
      features: [
        "AI Analysis",
        "Quick Processing",
        "Multiple Formats",
        "Key Insights",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="home" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-6">
            Your Complete PDF Solution
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Edit, convert, and summarize PDFs with our powerful suite of tools.
            Everything you need to work with PDFs in one place.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <Link
              key={index}
              href={module.href}
              className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{module.icon}</div>
                <h2 className="text-2xl font-bold text-black mb-4">
                  {module.title}
                </h2>
                <p className="text-gray-600 mb-6">{module.description}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Key Features:
                </h3>
                {module.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <span className="text-red-500 font-medium group-hover:text-red-600">
                  Get Started →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              Ready to transform your PDF workflow?
            </h2>
            <p className="text-gray-600 mb-6">
              Choose any of our tools above to get started with your PDF tasks.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/edit-sign"
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-medium transition-colors"
              >
                Start Editing
              </Link>
              <Link
                href="/converter"
                className="border border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 rounded-md font-medium transition-colors"
              >
                Convert Files
              </Link>
              <Link
                href="/summarizer"
                className="border border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 rounded-md font-medium transition-colors"
              >
                AI Summarize
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

