import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Package, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { blocksMetadata } from "@/content/blocks-metadata";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/")({
	component: App,
	head: () => ({
		meta: seo({
			title: "Doras UI - Beautiful React Component Library",
			description:
				"Discover Doras UI - A modern, accessible component library for React. Copy, paste, and customize beautiful UI blocks for your next project. Built with TypeScript and Tailwind CSS.",
			keywords:
				"doras ui, react components, tanstack router, ui library, shadcn, component library, react ui blocks, copy paste components, tailwind css, typescript, accessible components, modern ui, web development, frontend, react ecosystem",
			image: "/og/index.png",
		}),
	}),
});

function App() {
	const totalBlocks = blocksMetadata.length;
	const categories = [...new Set(blocksMetadata.map((b) => b.category))];
	const { data: githubData, isLoading: isLoadingStars } = useGitHubStars();

	return (
		<div className="container mx-auto py-20 px-4">
			<div className="max-w-3xl mx-auto text-center space-y-8">
				<div className="space-y-4">
					<h1 className="text-5xl font-bold tracking-tight">Doras UI</h1>
					<p className="text-xl text-muted-foreground">
						A collection of beautiful, reusable component blocks built with
						React
					</p>
				</div>

				<div className="flex items-center justify-center gap-4 text-sm">
					<Badge variant="secondary" className="flex items-center gap-2 h-6">
						<Package className="h-4 w-4" />
						<span>
							{totalBlocks} {totalBlocks === 1 ? "Block" : "Blocks"}
						</span>
					</Badge>
					<Badge variant="secondary" className="flex items-center gap-2 h-6">
						<span>
							{categories.length}{" "}
							{categories.length === 1 ? "Category" : "Categories"}
						</span>
					</Badge>
					{isLoadingStars ? (
						<Skeleton className="h-6 w-20" />
					) : (
						<a href="https://github.com/dorasto/ui">
							<Badge
								variant="secondary"
								className="flex items-center gap-2 h-6"
							>
								<Star className="h-4 w-4" />
								<span>
									{isLoadingStars ? "" : githubData?.stars || "0"} stars
								</span>
							</Badge>
						</a>
					)}
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
