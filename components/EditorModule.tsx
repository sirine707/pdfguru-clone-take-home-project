"use client";

import React, { useEffect, useRef } from "react";
import Header from "./Header";

export default function EditorModule() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && window.NutrientViewer) {
      window.NutrientViewer.load({
        container,
        document: "https://www.nutrient.io/downloads/nutrient-web-demo.pdf",
      });
    }

    return () => {
      if (window.NutrientViewer && container) {
        window.NutrientViewer.unload(container);
      }
    };
  }, []);

  // You must set the container height and width.
  return (
    <div className="min-h-screen bg-white">
      <Header activePage="edit-sign" />

      <div
        ref={containerRef}
        style={{
          height: "80vh",
          width: "100%",
        }}
        className="max-w-7xl my-4 mx-auto px-4 sm:px-6 lg:px-8"
      />
    </div>
  );
}

