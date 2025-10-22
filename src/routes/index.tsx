import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blocksMetadata } from "@/content/blocks-metadata";

export const Route = createFileRoute("/")({ component: App });

function App() {
	const totalBlocks = blocksMetadata.length;
	const categories = [...new Set(blocksMetadata.map((b) => b.category))];

	return (
		<div className="container mx-auto py-20 px-4">
			<div className="max-w-3xl mx-auto text-center space-y-8">
				<div className="space-y-4">
					<h1 className="text-5xl font-bold tracking-tight">Latest UI</h1>
					<p className="text-xl text-muted-foreground">
						A collection of beautiful, reusable component blocks built with
						React and TanStack Router
					</p>
				</div>

				<div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
					<div className="flex items-center gap-2">
						<Package className="h-4 w-4" />
						<span>
							{totalBlocks} {totalBlocks === 1 ? "Block" : "Blocks"}
						</span>
					</div>
					<div className="h-4 w-px bg-border" />
					<div>
						{categories.length}{" "}
						{categories.length === 1 ? "Category" : "Categories"}
					</div>
				</div>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
					<Button asChild size="lg" className="gap-2">
						<Link to="/blocks">
							Browse Blocks
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>

				<div className="pt-12 grid gap-4 sm:grid-cols-3 text-left">
					{[
						{
							title: "Copy & Paste",
							description:
								"Browse blocks, copy the code, and paste into your project",
						},
						{
							title: "Fully Customizable",
							description:
								"Every component is built with flexibility and customization in mind",
						},
						{
							title: "Live Previews",
							description:
								"See components in action before adding them to your project",
						},
					].map((feature) => (
						<div
							key={feature.title}
							className="rounded-lg border bg-card p-6 space-y-2"
						>
							<h3 className="font-semibold">{feature.title}</h3>
							<p className="text-sm text-muted-foreground">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
