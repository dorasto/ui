import { createFileRoute, notFound } from "@tanstack/react-router";
import { blocksComponents } from "@/content/blocks-components";
import { blocksMetadata } from "@/content/blocks-metadata";

export const Route = createFileRoute("/preview/$blockId")({
	component: BlockPreview,
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
