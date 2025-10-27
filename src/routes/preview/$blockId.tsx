import { createFileRoute, notFound } from "@tanstack/react-router";
import { blocksComponents } from "@/content/blocks-components";
import { blocksMetadata } from "@/content/blocks-metadata";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/preview/$blockId")({
	component: BlockPreview,
	head: ({ params }) => {
		// Search for the example across all blocks
		let foundExample = null;
		let parentBlock = null;

		for (const block of blocksMetadata) {
			const example = block.examples.find((ex) => ex.id === params.blockId);
			if (example) {
				foundExample = example;
				parentBlock = block;
				break;
			}
		}

		if (!foundExample || !parentBlock) {
			return {
				meta: seo({
					title: "Preview Not Found | Doras UI",
					description: "The requested component preview was not found.",
					keywords: "doras ui, component preview",
				}),
			};
		}

		return {
			meta: seo({
				title: `${foundExample.name} - ${parentBlock.name} Preview | Doras UI`,
				description: `Live preview of ${foundExample.name} - a ${parentBlock.category} component example. View the full implementation in an isolated environment.`,
				keywords: `${foundExample.name.toLowerCase()}, ${parentBlock.name.toLowerCase()}, component preview, react preview, live demo`,
			}),
		};
	},
});

function BlockPreview() {
	const { blockId } = Route.useParams();

	// Search for the example across all blocks
	let foundExample = null;
	for (const block of blocksMetadata) {
		const example = block.examples.find((ex) => ex.id === blockId);
		if (example) {
			foundExample = example;
			break;
		}
	}

	const Component = blocksComponents[blockId];

	if (!foundExample || !Component) {
		throw notFound();
	}

	return (
		<div className="min-h-screen w-full">
			<Component />
		</div>
	);
}
