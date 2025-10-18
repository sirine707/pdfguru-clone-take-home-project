"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "../lib/navigation";
import AuthModal from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  activePage?: "edit-sign" | "converter" | "summarizer" | "home";
}

export default function Header({ activePage = "home" }: HeaderProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const langMenuRef = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: string) => {
    // Use the localized router to switch locale while preserving the current path
    router.replace(pathname, { locale: newLocale });
    setIsLangMenuOpen(false);
  };

  // Handle clicks outside the language menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };

    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangMenuOpen]);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-4">
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{t("language")}</span>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => switchLocale("en")}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      locale === "en" ? "font-bold text-black" : "text-gray-600"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => switchLocale("fr")}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      locale === "fr" ? "font-bold text-black" : "text-gray-600"
                    }`}
                  >
                    Français
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* <div className="text-sm text-gray-600">
            Contact Us
          </div> */}
        </div>

        {/* Main header */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-red-500">pdf</span>
              <span className="text-2xl font-bold text-black">guru</span>
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link
                href="/edit-sign"
                className={`hover:text-red-500 font-medium ${
                  activePage === "edit-sign" ? "text-black" : "text-gray-600"
                }`}
              >
                {t("editSign")}
              </Link>
              <Link
                href="/converter"
                className={`hover:text-red-500 font-medium ${
                  activePage === "converter" ? "text-black" : "text-gray-600"
                }`}
              >
                {t("convert")}
              </Link>
              <Link
                href="/summarizer"
                className={`hover:text-red-500 font-medium ${
                  activePage === "summarizer" ? "text-black" : "text-gray-600"
                }`}
              >
                {t("aiSummarizer")}
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    <span className="text-black text-sm font-medium">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <button
                      onClick={signOut}
                      className="px-4 py-2 border border-black rounded-md text-black text-sm font-medium hover:bg-gray-50"
                    >
                      {t("logOut")}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-4 py-2 border border-black rounded-md text-black text-sm font-medium hover:bg-gray-50"
                  >
                    {t("signIn")}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}

