import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Code, ExternalLink, Eye } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blocksMetadata } from "@/content/blocks-metadata";

export const Route = createFileRoute("/blocks/$blockId")({
	component: BlockPage,
});

function BlockPage() {
	const { blockId } = Route.useParams();
	const block = blocksMetadata.find((b) => b.id === blockId);

	if (!block) {
		throw notFound();
	}

	return (
		<div className="container mx-auto py-8 px-4">
			<div className="mb-6">
				<Link
					to="/blocks"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to blocks
				</Link>
			</div>

			<div className="space-y-6">
				<div className="space-y-3">
					<div className="flex items-start justify-between">
						<div className="space-y-1">
							<h1 className="text-3xl font-bold">{block.name}</h1>
							{block.description && (
								<p className="text-muted-foreground text-lg">
									{block.description}
								</p>
							)}
						</div>
						<div className="flex items-center gap-2">
							<span className="rounded-md bg-muted px-3 py-1 text-sm capitalize">
								{block.category}
							</span>
						</div>
					</div>
				</div>

				<Tabs defaultValue="preview" className="w-full">
					<TabsList className="grid w-full max-w-md grid-cols-2">
						<TabsTrigger value="preview" className="gap-2">
							<Eye className="h-4 w-4" />
							Preview
						</TabsTrigger>
						<TabsTrigger value="code" className="gap-2">
							<Code className="h-4 w-4" />
							Code
						</TabsTrigger>
					</TabsList>

					<TabsContent value="preview" className="mt-6">
						<div className="rounded-lg border bg-card overflow-hidden">
							<div className="border-b bg-muted/50 px-4 py-2 flex items-center justify-between">
								<span className="text-sm font-medium">Preview</span>
								<Button variant="ghost" size="sm" asChild className="h-8 gap-2">
									<a
										href={`/preview/${blockId}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<ExternalLink className="h-3.5 w-3.5" />
										Open in new tab
									</a>
								</Button>
							</div>
							<iframe
								title={`preview-${blockId}`}
								src={`/preview/${blockId}`}
								className="w-full bg-background"
								style={{ height: block.iframeHeight || "600px" }}
							/>
						</div>
					</TabsContent>

					<TabsContent value="code" className="mt-6">
						<div className="rounded-lg border bg-muted/50 p-6">
							<p className="text-sm text-muted-foreground">
								Code view coming soon. For now, check the source at{" "}
								<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
									content/components/{blockId}.tsx
								</code>
							</p>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
