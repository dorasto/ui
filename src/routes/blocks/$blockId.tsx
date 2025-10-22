import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
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

			<div className="space-y-8">
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

				{/* All examples mapped out */}
				<div className="space-y-12">
					{block.examples.map((example) => (
						<div key={example.id} className="space-y-4">
							<div className="space-y-2">
								<h2 className="text-2xl font-semibold">{example.name}</h2>
								{example.description && (
									<p className="text-muted-foreground">{example.description}</p>
								)}
							</div>
							<div className="rounded-lg border bg-card overflow-hidden">
								<Tabs>
									<TabsList>
										<TabsTrigger value="preview">Preview</TabsTrigger>
										<TabsTrigger value="code">Code</TabsTrigger>
									</TabsList>
									<TabsContent value="account">
										Make changes to your account here.
									</TabsContent>
									<TabsContent value="password">
										Change your password here.
									</TabsContent>
								</Tabs>
								<div className="border-b bg-muted/50 px-4 py-2 flex items-center justify-between">
									<span className="text-sm font-medium">Preview</span>
									<Button
										variant="ghost"
										size="sm"
										asChild
										className="h-8 gap-2"
									>
										<a
											href={`/preview/${example.id}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<ExternalLink className="h-3.5 w-3.5" />
											Open in new tab
										</a>
									</Button>
								</div>
								<iframe
									title={`preview-${example.id}`}
									src={`/preview/${example.id}`}
									className="w-full bg-background"
									style={{ height: example.iframeHeight || "600px" }}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
