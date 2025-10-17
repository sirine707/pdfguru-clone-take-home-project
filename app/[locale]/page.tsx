"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../lib/navigation";
import Header from "../../components/Header";

export default function Home() {
  const t = useTranslations("Home");
  
  const modules = [
    {
      title: t("modules.editSign.title"),
      description: t("modules.editSign.description"),
      href: "/edit-sign",
      icon: "✏️",
      features: [
        t("modules.editSign.features.edit"),
        t("modules.editSign.features.compress"),
        t("modules.editSign.features.split"),
        t("modules.editSign.features.merge"),
        t("modules.editSign.features.sign"),
        t("modules.editSign.features.annotate"),
      ],
    },
    {
      title: t("modules.converter.title"),
      description: t("modules.converter.description"),
      href: "/converter",
      icon: "🔄",
      features: [
        t("modules.converter.features.pdfToWord"),
        t("modules.converter.features.pdfToImage"),
        t("modules.converter.features.wordToPdf"),
        t("modules.converter.features.imageToPdf"),
        t("modules.converter.features.excelToPdf"),
      ],
    },
    {
      title: t("modules.summarizer.title"),
      description: t("modules.summarizer.description"),
      href: "/summarizer",
      icon: "🤖",
      features: [
        t("modules.summarizer.features.aiAnalysis"),
        t("modules.summarizer.features.quickProcessing"),
        t("modules.summarizer.features.multipleFormats"),
        t("modules.summarizer.features.keyInsights"),
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
            {t("heroTitle")}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t("heroSubtitle")}
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
                  {t("keyFeatures")}
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
                  {t("getStarted")}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link
                href="/edit-sign"
                className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 rounded-md font-medium transition-colors text-center"
              >
                {t("startEditing")}
              </Link>
              <Link
                href="/converter"
                className="border border-red-500 text-red-500 hover:bg-red-50 px-6 sm:px-8 py-3 rounded-md font-medium transition-colors text-center"
              >
                {t("convertFiles")}
              </Link>
              <Link
                href="/summarizer"
                className="border border-red-500 text-red-500 hover:bg-red-50 px-6 sm:px-8 py-3 rounded-md font-medium transition-colors text-center"
              >
                {t("aiSummarize")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

