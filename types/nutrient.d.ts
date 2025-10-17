interface NutrientViewerInstance {
  load: (config: {
    container: HTMLElement | null;
    document: string;
    [key: string]: any;
  }) => Promise<any>;
  unload: (container: HTMLElement | null) => void;
  [key: string]: any;
}

interface Window {
  NutrientViewer?: NutrientViewerInstance;
}

