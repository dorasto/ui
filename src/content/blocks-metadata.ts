import {
	IconClipboard,
	IconCopy,
	IconMail,
	IconTerminal,
} from "@tabler/icons-react";

export const categoryIds = {
	Clipboard: "clipboard",
	// Add more categories as you expand
} as const;

export interface BlockExample {
	id: string;
	name: string;
	description?: string;
	iframeHeight?: string;
	icon?: React.ComponentType<{ size?: number | string; className?: string }>;
}

export interface BlockMetadata {
	id: string;
	category: string;
	name: string;
	description?: string;
	image?: string;
	icon?: React.ComponentType<{ size?: number | string; className?: string }>;
	examples: BlockExample[];
	/** Optional: If true, will attempt to load /src/content/docs/{id}.mdx for detailed documentation */
	hasDocs?: boolean;
}

export const blocksMetadata: BlockMetadata[] = [
	{
		id: "clipboard",
		category: categoryIds.Clipboard,

		name: "Clipboard",
		description:
			"Copy to clipboard components with various styles and interactions.",
		image: "/components/clipboard.png",
		icon: IconCopy,
		hasDocs: true,
		examples: [
			{
				id: "clipboard-01",
				name: "Example",
				description: "A simple clipboard component to copy a string",
			},
			{
				id: "clipboard-02",
				name: "Custom button",
				description:
					"You can use your own button as a child component for more control and styling abilities",
			},
		],
	},
];
