export const categoryIds = {
	Clipboard: "clipboard",
	// Add more categories as you expand
} as const;

export interface BlockExample {
	id: string;
	name: string;
	description?: string;
	iframeHeight?: string;
}

export interface BlockMetadata {
	id: string;
	category: string;
	name: string;
	description?: string;
	examples: BlockExample[];
}

export const blocksMetadata: BlockMetadata[] = [
	{
		id: "clipboard",
		category: categoryIds.Clipboard,
		name: "Clipboard",
		description:
			"Copy to clipboard components with various styles and interactions.",
		examples: [
			{
				id: "clipboard-01",
				name: "Basic Clipboard",
				description: "A simple clipboard button with tooltip feedback",
			},
			{
				id: "clipboard-02",
				name: "Code Snippet Clipboard",
				description:
					"Clipboard designed for code snippets and terminal commands",
			},
			{
				id: "clipboard-03",
				name: "Interactive Clipboard",
				description: "Interactive demo with multiple copy options",
			},
		],
	},
];
