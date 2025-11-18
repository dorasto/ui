import {
	IconCopy,
	IconExternalLink,
	IconLayoutSidebar,
	IconSection,
} from "@tabler/icons-react";

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
	inspired?: Array<{ name: string; url: string; pic?: string }>;
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
		id: "tile",
		category: categoryIds.General,

		name: "Tile",
		description:
			"Flexible tile components for displaying content. Similar to the shadcn/ui item component, but my custom implementation prior to the release of that, but refactored to be similar.",
		image: "/components/tile.png",
		icon: IconSection,
		hasDocs: true,
		examples: [
			{
				id: "tile-01",
				name: "Example",
				description: "Showcase the base function",
			},
			{
				id: "tile-02",
				name: "Use as a link",
				description:
					"By using asChild, you can use the tile as a link or any other component",
			},
			{
				id: "tile-03",
				name: "Outline",
				description:
					"Using the outline variant that uses React Context to style children",
			},
			{
				id: "tile-04",
				name: "Transparent",
				description:
					"Similar to outline, but with a transparent background for use on cards or colored backgrounds",
			},
		],
		props: [
			{
				name: "variant",
				type: '"default" | "outline" | "transparent"',
				defaultValue: '"default"',
				description: "The visual style variant of the tile.",
			},
			{
				name: "asChild",
				type: "boolean",
				defaultValue: "false",
				description: "Render as a child component using Radix Slot.",
			},
			{
				name: "className",
				type: "string",
				description: "Additional CSS classes for the tile.",
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
		inspired: [
			{
				name: "Kibo UI",
				url: "https://www.kibo-ui.com/components/glimpse",
				pic: "https://www.kibo-ui.com/icon.png?icon.0423e3ed.png",
			},
		],
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
	{
		id: "sidebar",
		category: categoryIds.General,
		name: "Sidebar",
		description:
			"A composable, collapsible, and persistent sidebar component with keyboard shortcuts and mobile support.",
		image: "/components/sidebar.png",
		icon: IconLayoutSidebar,
		hasDocs: true,
		examples: [
			{
				id: "sidebar-01",
				name: "Main Sidebar",
				description:
					"The main sidebar used in this documentation, featuring collapsible groups, active states, and mobile responsiveness.",
				iframeHeight: "800px",
			},
			{
				id: "sidebar-02",
				name: "Right Sidebar",
				description: "A sidebar positioned on the right side of the screen.",
				iframeHeight: "600px",
			},
			{
				id: "sidebar-03",
				name: "Multiple sidebars",
				description:
					"Modify and manage multiple sidebars without layout or overflow problems. Pass classNames to style individually including setting widths and heights, and manage what appears on one sidebar depending on the other easily",
				iframeHeight: "600px",
			},
		],
		props: [
			{
				name: "id",
				type: "string",
				description: "Unique identifier for the sidebar state persistence.",
				required: true,
			},
			{
				name: "side",
				type: '"left" | "right"',
				defaultValue: '"left"',
				description: "Which side of the screen the sidebar appears on.",
			},
			{
				name: "variant",
				type: '"default" | "floating"',
				defaultValue: '"default"',
				description: "Visual style variant.",
			},
			{
				name: "collapsible",
				type: "boolean",
				defaultValue: "true",
				description: "Whether the sidebar can be collapsed.",
			},
			{
				name: "defaultOpen",
				type: "boolean",
				defaultValue: "true",
				description: "Initial open state.",
			},
			{
				name: "width",
				type: "string",
				defaultValue: '"16rem"',
				description: "Expanded width.",
			},
			{
				name: "collapsedWidth",
				type: "string",
				defaultValue: '"3.5rem"',
				description: "Collapsed width.",
			},
			{
				name: "keyboardShortcut",
				type: "string",
				description:
					"Keyboard shortcut to toggle the sidebar (e.g. 'b' for Cmd+B).",
			},
			{
				name: "className",
				type: "string",
				description: "Additional CSS classes for the sidebar container.",
			},
			{
				name: "rootClassName",
				type: "string",
				description:
					"Additional CSS classes for the root wrapper element (useful for margins/positioning).",
			},
			{
				name: "isCollapsed",
				type: "boolean",
				description:
					"Forces the sidebar to be in a collapsed state, overriding the internal state.",
			},
		],
	},
];
