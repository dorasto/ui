export const categoryIds = {
  Clipboard: "clipboard",
  // Add more categories as you expand
} as const;

export interface BlockMetadata {
  id: string;
  category: string;
  name: string;
  description?: string;
  iframeHeight?: string;
  type: "file" | "directory";
}

export const blocksMetadata: BlockMetadata[] = [
  {
    id: "clipboard-01",
    category: categoryIds.Clipboard,
    name: "Basic Clipboard",
    description: "A simple clipboard button with tooltip feedback",
    iframeHeight: "400px",
    type: "file",
  },
  {
    id: "clipboard-02",
    category: categoryIds.Clipboard,
    name: "Code Snippet Clipboard",
    description: "Clipboard designed for code snippets and terminal commands",
    iframeHeight: "450px",
    type: "file",
  },
  {
    id: "clipboard-03",
    category: categoryIds.Clipboard,
    name: "Interactive Clipboard",
    description: "Interactive demo with multiple copy options",
    iframeHeight: "550px",
    type: "file",
  },
];
