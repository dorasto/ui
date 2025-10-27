import { createFileRoute, Link } from "@tanstack/react-router";
import { blocksMetadata } from "@/content/blocks-metadata";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/blocks/")({
	component: BlocksIndex,
	head: () => {
		const totalBlocks = blocksMetadata.length;
		const categories = [...new Set(blocksMetadata.map((b) => b.category))];

		return {
			meta: seo({
				title: `Browse ${totalBlocks} UI Components | Doras UI Component Library`,
				description: `Explore ${totalBlocks} professionally designed React components across ${categories.length} categories. Copy, paste, and customize UI blocks for TanStack Router. Includes sidebars, clipboards, forms, navigation, and more.`,
				keywords: `react components, ui blocks, ${categories.join(", ")}, component examples, tanstack router components, react ui library, code snippets, reusable components`,
			}),
		};
	},
});

function BlocksIndex() {
	const blocksByCategory = blocksMetadata.reduce(
		(acc, block) => {
			if (!acc[block.category]) {
				acc[block.category] = [];
			}
			acc[block.category].push(block);
			return acc;
		},
		{} as Record<string, typeof blocksMetadata>,
	);

	return (
		<div className="container mx-auto py-10 px-4">
			<div className="mb-8 space-y-2">
				<h1 className="text-4xl font-bold">Components</h1>
				<p className="text-muted-foreground text-lg">
					Browse and preview reusable component blocks for your projects
				</p>
			</div>

			<div className="space-y-10">
				{Object.entries(blocksByCategory).map(([category, blocks]) => (
					<section key={category} className="space-y-4">
						<div className="flex items-center gap-3">
							<h2 className="text-2xl font-semibold capitalize">{category}</h2>
							<span className="rounded-full bg-muted px-3 py-0.5 text-sm text-muted-foreground">
								{blocks.length} {blocks.length === 1 ? "block" : "blocks"}
							</span>
						</div>

						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{blocks.map((block) => (
								<Link
									key={block.id}
									to="/blocks/$blockId"
									params={{ blockId: block.id }}
									className="group rounded-lg border bg-card transition-all hover:border-primary hover:shadow-md"
								>
									<div className="p-6 space-y-3">
										<div className="flex items-start justify-between">
											<h3 className="font-semibold text-lg transition-colors flex items-center gap-2">
												{block.icon && <block.icon className="h-4 w-4" />}
												{block.name}
											</h3>
											<span className="text-xs text-primary-foreground capitalize px-2 py-1 rounded bg-primary">
												{block.examples.length}{" "}
												{block.examples.length === 1 ? "example" : "examples"}
											</span>
										</div>
										{block.image && (
											<img
												src={block.image}
												alt={block.name}
												className="w-full p-3 bg-background rounded-lg"
											/>
										)}
										{block.description && (
											<p className="text-sm line-clamp-2">
												{block.description}
											</p>
										)}
									</div>
								</Link>
							))}
						</div>
					</section>
				))}
			</div>
		</div>
	);
}
