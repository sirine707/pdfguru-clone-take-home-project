"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "../lib/navigation";
import ReactMarkdown from "react-markdown";
import Header from "./Header";
import { useFile } from "../contexts/FileContext";

export default function SummarizerEditorModule() {
  const t = useTranslations("SummarizerEditorModule");
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<
    Array<{ type: "user" | "assistant"; content: string }>
  >([]);
  const [userMessage, setUserMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const { selectedFile } = useFile();
  const router = useRouter();
  const hasInitialized = useRef(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const pdfObjectUrl = useMemo(() => {
    return selectedFile ? URL.createObjectURL(selectedFile) : null;
  }, [selectedFile]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    if (selectedFile && !hasInitialized.current) {
      hasInitialized.current = true;
      initializeSummarizer();
    }
  }, [selectedFile]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory]);

  // Function to clean up citation references
  const cleanResponse = (text: string) => {
    return text.replace(/【\d+:\d+†[^】]+】/g, "");
  };

  const initializeSummarizer = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("pdf", selectedFile);
      formData.append("locale", locale);

      const response = await fetch(
        `${API_BASE_URL}/summarizer/initialize`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to initialize summarizer");
      }

      const data = await response.json();
      setThreadId(data.threadId);

      // Add the summary to chat history with cleaned content
      setChatHistory([
        {
          type: "assistant",
          content: cleanResponse(data.summary),
        },
      ]);
    } catch (error) {
      console.error("Error initializing summarizer:", error);
      setChatHistory([
        {
          type: "assistant",
          content: t("errors.processingPdf"),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!userMessage.trim() || !threadId || isSendingMessage) return;

    const userQuestion = userMessage.trim();
    setUserMessage("");
    setIsSendingMessage(true);

    // Add user message to chat history
    setChatHistory((prev) => [
      ...prev,
      { type: "user", content: userQuestion },
    ]);

    try {
      const response = await fetch(`${API_BASE_URL}/summarizer/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId,
          question: userQuestion,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      // Add assistant response to chat history with cleaned content
      setChatHistory((prev) => [
        ...prev,
        { type: "assistant", content: cleanResponse(data.answer) },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "assistant",
          content: t("errors.processingQuestion"),
        },
      ]);
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="summarizer" />

      {!selectedFile ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center p-8">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t("noFile.title")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("noFile.message")}
            </p>
            <button
              onClick={() => router.push("/summarizer")}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md font-medium transition-colors"
            >
              {t("noFile.button")}
            </button>
          </div>
        </div>
      ) : (
        /* Main content */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">{t("loading")}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left side - PDF Viewer */}
              <div className="bg-white rounded-lg border border-gray-200 h-[80vh] flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">
                    {t("documentPreview")}
                  </h2>
                </div>

                {/* PDF Content */}
                <div className="flex-1 bg-gray-50 rounded-b border border-gray-300">
                  {pdfObjectUrl ? (
                    <iframe
                      src={pdfObjectUrl}
                      className="w-full h-full rounded-b"
                      title="PDF Document"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
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
                        <p className="text-lg font-medium">{t("noPdfSelected.title")}</p>
                        <p className="text-sm mt-2 text-gray-400">
                          {t("noPdfSelected.message")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right side - Summary Panel */}
              <div className="bg-white rounded-lg border border-gray-200 h-[80vh] flex flex-col">
                {/* Header with P icon and title */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900">
                      {t("aiSummary")}
                    </h2>
                  </div>
                </div>

                 {/* Chat History */}
                 <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <p className="text-sm">
                        {t("startConversation")}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatHistory.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.type === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            {message.type === "assistant" ? (
                              <div className="text-sm prose prose-sm max-w-none [&>*]:mb-4 [&>*:last-child]:mb-0">
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                              </div>
                            ) : (
                              <div className="text-sm whitespace-pre-wrap">
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {isSendingMessage && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                              <span className="text-sm text-gray-600">
                                {t("thinking")}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={t("messagePlaceholder")}
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      disabled={isSendingMessage || !threadId}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={
                        isSendingMessage || !threadId || !userMessage.trim()
                      }
                      className="w-8 h-8 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
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
      )}
    </div>
  );
}
