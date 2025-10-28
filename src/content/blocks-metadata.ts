import { IconCopy, IconExternalLink } from "@tabler/icons-react";

export const categoryIds = {
	General: "general",
	// Add more categories as you expand
} as const;

export interface BlockExample {
	id: string;
	name: string;
	description?: string;
	iframeHeight?: string;
	icon?: React.ComponentType<{ size?: number | string; className?: string }>;
}

export interface PropDefinition {
	name: string;
	type: string;
	defaultValue?: string;
	description: string;
	required?: boolean;
}

export interface BlockMetadata {
	id: string;
	category: string;
	name: string;
	description?: string;
	image?: string;
	icon?: React.ComponentType<{ size?: number | string; className?: string }>;
	examples: BlockExample[];
	/** Optional: If true, will attempt to load /src/content/{id}/docs.mdx for detailed documentation */
	hasDocs?: boolean;
	/** Optional: API props documentation */
	props?: PropDefinition[];
	preview?: boolean;
}

export const blocksMetadata: BlockMetadata[] = [
	{
		id: "clipboard",
		category: categoryIds.General,

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
				description:
					"Code copy with tabs to select which code to copy. Turns into a dropdown on smaller screens.",
			},
			{
				id: "clipboard-02",
				name: "Custom button",
				description:
					"You can use your own button as a child component for more control and styling abilities",
			},
			{
				id: "clipboard-03",
				name: "Simple",
				description: "The raw component",
			},
		],
		props: [
			{
				name: "textToCopy",
				type: "string",
				description: "The text to copy to clipboard.",
				required: true,
			},
			{
				name: "children",
				type: "React.ReactNode",
				description:
					"Custom trigger element. If not provided, uses default button with icons.",
			},
			{
				name: "className",
				type: "string",
				description: "Additional CSS classes for the button.",
			},
			{
				name: "iconSize",
				type: "number",
				defaultValue: "16",
				description: "Size of the copy and check icons.",
			},
			{
				name: "copiedDuration",
				type: "number",
				defaultValue: "1500",
				description: "Duration in ms to show the copied state.",
			},
			{
				name: "tooltipText",
				type: "string",
				defaultValue: '"Click to copy"',
				description: "Tooltip text before copying.",
			},
			{
				name: "tooltipCopiedText",
				type: "string",
				defaultValue: '"Copied!"',
				description: "Tooltip text after copying.",
			},
			{
				name: "showTooltip",
				type: "boolean",
				defaultValue: "true",
				description: "Whether to show the tooltip.",
			},
			{
				name: "copyIcon",
				type: "React.ReactNode",
				defaultValue: "<Copy />",
				description: "Custom copy icon.",
			},
			{
				name: "checkIcon",
				type: "React.ReactNode",
				defaultValue: "<Check />",
				description: "Custom check icon.",
			},
			{
				name: "checkIconClassName",
				type: "string",
				description: "CSS classes for the check icon.",
			},
			{
				name: "copyIconClassName",
				type: "string",
				description: "CSS classes for the copy icon.",
			},
			{
				name: "onCopy",
				type: "() => void",
				description: "Callback fired after successful copy.",
			},
			{
				name: "onError",
				type: "(error: Error) => void",
				description: "Callback fired on copy failure.",
			},
			{
				name: "tooltipDelayDuration",
				type: "number",
				defaultValue: "0",
				description: "Delay before showing tooltip in ms.",
			},
			{
				name: "disabled",
				type: "boolean",
				defaultValue: "false",
				description: "Whether the component is disabled.",
			},
		],
	},
	{
		id: "preview",
		category: categoryIds.General,
		name: "URL Preview",
		description:
			"Show website metadata and OpenGraph images when hovering over URLs.",
		image: "/components/preview.png",
		icon: IconExternalLink,
		hasDocs: true,
		examples: [
			{
				id: "preview-01",
				name: "Basic",
				description:
					"Simple URL preview with hover card showing website metadata.",
				iframeHeight: "600px",
			},
			{
				id: "preview-02",
				name: "Hide the image",
				description:
					"Preview without displaying the OpenGraph image in the hover card.",
			},
			{
				id: "preview-03",
				name: "Custom trigger",
				description:
					"Using a custom button as the trigger element for the URL preview hover card.",
				iframeHeight: "600px",
			},
		],
		props: [
			{
				name: "url",
				type: "string",
				description: "The URL to preview and fetch metadata for.",
				required: true,
			},
			{
				name: "children",
				type: "React.ReactNode",
				description:
					"Custom trigger element. If not provided, uses default link with external icon.",
			},
			{
				name: "showImage",
				type: "boolean",
				defaultValue: "true",
				description: "Whether to display the OpenGraph image.",
			},
			{
				name: "showTitle",
				type: "boolean",
				defaultValue: "true",
				description: "Whether to display the page title.",
			},
			{
				name: "showDescription",
				type: "boolean",
				defaultValue: "true",
				description: "Whether to display the page description.",
			},
			{
				name: "className",
				type: "string",
				description: "Additional CSS classes for the trigger element.",
			},
			{
				name: "contentClassName",
				type: "string",
				description: "Additional CSS classes for the hover card content.",
			},
			{
				name: "onError",
				type: "(error: Error) => void",
				description: "Callback function called when metadata fetching fails.",
			},
		],
	},
];
