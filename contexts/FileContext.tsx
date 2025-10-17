"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FileContextType {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  clearFile: () => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: ReactNode }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const clearFile = () => {
    setSelectedFile(null);
  };

  const value = {
    selectedFile,
    setSelectedFile,
    clearFile,
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
}

export function useFile() {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
}

