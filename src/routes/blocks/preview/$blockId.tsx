import { createFileRoute, notFound } from "@tanstack/react-router";
import { blocksComponents } from "@/content/blocks-components";
import { blocksMetadata } from "@/content/blocks-metadata";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/blocks/preview/$blockId")({
	component: BlockPreview,
	head: ({ params }) => {
		const block = blocksMetadata.find((b) => b.id === params.blockId);

		if (!block) {
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
				title: `${block.name} Live Preview | Doras UI`,
				description: `Full-screen live preview of ${block.name} component. ${block.description} View the component in action with all features enabled.`,
				keywords: `${block.name.toLowerCase()} preview, ${block.category} preview, live demo, react component demo`,
			}),
		};
	},
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
	);
}
