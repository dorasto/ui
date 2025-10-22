import { createFileRoute, notFound } from "@tanstack/react-router";
import { blocksComponents } from "@/content/blocks-components";
import { blocksMetadata } from "@/content/blocks-metadata";

export const Route = createFileRoute("/blocks/preview/$blockId")({
	component: BlockPreview,
});

function BlockPreview() {
	const { blockId } = Route.useParams();
	const block = blocksMetadata.find((b) => b.id === blockId);
	const Component = blocksComponents[blockId];

	if (!block || !Component) {
		throw notFound();
	}

	return (
		<div className="min-h-screen w-full">
			<Component />
		</div>
	)
}
