"use client";

import { useState } from "react";
import Link from "next/link";
import AuthModal from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  activePage?: "edit-sign" | "converter" | "summarizer" | "home";
}

export default function Header({ activePage = "home" }: HeaderProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, isLoading, signOut } = useAuth();

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clipRule="evenodd"
                />
              </svg>
              <span>English</span>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
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
                Edit & Sign
              </Link>
              <Link
                href="/converter"
                className={`hover:text-red-500 font-medium ${
                  activePage === "converter" ? "text-black" : "text-gray-600"
                }`}
              >
                Convert
              </Link>
              <Link
                href="/summarizer"
                className={`hover:text-red-500 font-medium ${
                  activePage === "summarizer" ? "text-black" : "text-gray-600"
                }`}
              >
                AI PDF Summarizer
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
                      Log out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-4 py-2 border border-black rounded-md text-black text-sm font-medium hover:bg-gray-50"
                  >
                    Sign In
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

