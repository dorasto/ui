import { createFileRoute } from "@tanstack/react-router";
import { blocksMetadata } from "@/content/blocks-metadata";
import { generateSeoImage } from "@/lib/seo-image-generator";

export const Route = createFileRoute("/og/blocks.png")({
	server: {
		handlers: {
			GET: async () => {
				const totalBlocks = blocksMetadata.length;
				const categories = [...new Set(blocksMetadata.map((b) => b.category))];

				const image = await generateSeoImage({
					title: "Browse Component Blocks",
					description: `${totalBlocks} beautiful, reusable components across ${categories.length} categories`,
					siteName: "Doras UI",
					url: "ui.doras.to",
				});

				return image;
			},
		},
	},
});
