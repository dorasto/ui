import { createFileRoute } from "@tanstack/react-router";
import { blocksMetadata } from "@/content/blocks-metadata";
import { generateSeoImage } from "@/lib/seo-image-generator";

export const Route = createFileRoute("/og/blocks/$blockId.png")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				// The route param is "blockId.png" due to the file naming convention
				// @ts-expect-error - TanStack Router provides blockId without extension at runtime
				let blockId = params.blockId || params["blockId.png"];

				// Strip the .png extension if it exists
				if (blockId.endsWith(".png")) {
					blockId = blockId.slice(0, -4);
				}

				console.log("OG Image Request:", { params, blockId });

				const block = blocksMetadata.find((b) => b.id === blockId);

				if (!block) {
					console.log(
						"Block not found:",
						blockId,
						"Available blocks:",
						blocksMetadata.map((b) => b.id),
					);
					// Return a default/404 image
					return await generateSeoImage({
						title: "Block Not Found",
						description: `Requested: ${blockId}. The requested component block was not found`,
						siteName: "Doras UI",
						url: "ui.doras.to",
					});
				}

				const exampleCount = block.examples?.length || 0;
				const hasMultipleExamples = exampleCount > 1;

				const description = block.description
					? `${block.description}${hasMultipleExamples ? ` • ${exampleCount} examples` : ""}`
					: undefined;

				const image = await generateSeoImage({
					title: block.name,
					description,
					url: "ui.doras.to",
					image: `http://localhost:3000/` + block.image,
				});

				return image;
			},
		},
	},
});
