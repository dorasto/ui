import { createFileRoute, Link } from "@tanstack/react-router";
import { blocksMetadata } from "@/content/blocks-metadata";

export const Route = createFileRoute("/blocks/")({
	component: BlocksIndex,
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
											<h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
												{block.name}
											</h3>
											<span className="text-xs text-muted-foreground capitalize px-2 py-1 rounded bg-muted">
												{block.examples.length}{" "}
												{block.examples.length === 1 ? "example" : "examples"}
											</span>
										</div>
										{block.description && (
											<p className="text-sm text-muted-foreground line-clamp-2">
												{block.description}
											</p>
										)}
										<div className="pt-2">
											<span className="text-sm text-primary group-hover:underline">
												View Examples →
											</span>
										</div>
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
