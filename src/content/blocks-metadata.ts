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
	/** Optional: If true, will attempt to load /src/content/docs/{id}.mdx for detailed documentation */
	hasDocs?: boolean;
	/** Optional: API props documentation */
	props?: PropDefinition[];
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
				description:
					"Code copy with tabs to select which code to copy. Turns into a dropdown on smaller screens.",
			},
			{
				id: "clipboard-02",
				name: "Custom button",
				description:
					"You can use your own button as a child component for more control and styling abilities",
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
];
