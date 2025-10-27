import Clipboard from "@@/registry/clipboard/clipboard";
import {
	IconBrandNpm,
	IconBrandPnpm,
	IconBrandUbuntu,
} from "@tabler/icons-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Monitor, Smartphone, Tablet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ImperativePanelGroupHandle } from "react-resizable-panels";
import BunIcon from "@/components/icons/bun";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Label } from "@/components/ui/label";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { blocksMetadata } from "@/content/blocks-metadata";
import { getBlockDocs, getExampleCode } from "@/lib/code-loader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blocks/$blockId")({
	component: BlockPage,
});

function BlockPage() {
	const { blockId } = Route.useParams();
	const block = blocksMetadata.find((b) => b.id === blockId);

	if (!block) {
		throw notFound();
	}

	const [deviceSize, setDeviceSize] = useState<string>("desktop");
	const [exampleCodes, setExampleCodes] = useState<Map<string, string>>(
		new Map(),
	);
	const [loadingCodes, setLoadingCodes] = useState<Set<string>>(new Set());
	const [BlockDocsComponent, setBlockDocsComponent] =
		useState<React.ComponentType | null>(null);

	const panelGroupRefs = useRef<Map<string, ImperativePanelGroupHandle>>(
		new Map(),
	);

	// Load block documentation if available
	useEffect(() => {
		if (block.hasDocs) {
			getBlockDocs(block.id).then((component) => {
				if (component) {
					setBlockDocsComponent(() => component);
				}
			});
		}
	}, [block.id, block.hasDocs]);

	// Load code for a specific example
	const loadExampleCode = async (exampleId: string) => {
		if (exampleCodes.has(exampleId) || loadingCodes.has(exampleId)) {
			return;
		}

		setLoadingCodes((prev) => new Set(prev).add(exampleId));
		const code = await getExampleCode(exampleId);

		if (code) {
			setExampleCodes((prev) => new Map(prev).set(exampleId, code));
		}

		setLoadingCodes((prev) => {
			const next = new Set(prev);
			next.delete(exampleId);
			return next;
		});
	};

	const handleSizeChange = (exampleId: string, size: string) => {
		if (!size) return;

		setDeviceSize(size);
		const panelGroup = panelGroupRefs.current.get(exampleId);

		if (panelGroup) {
			switch (size) {
				case "desktop":
					panelGroup.setLayout([100, 0]);
					break;
				case "tablet":
					panelGroup.setLayout([60, 40]);
					break;
				case "mobile":
					panelGroup.setLayout([33, 67]);
					break;
			}
		}
	};
	const baseUrl = import.meta.env.VITE_BASE_URL;
	const installSnippet = {
		npm: `npx shadcn@latest add ${baseUrl}/r/${block.id}.json`,
		pnpm: `pnpm dlx shadcn@latest add ${baseUrl}/r/${block.id}.json`,
		bun: `bunx --bun shadcn@latest add ${baseUrl}/r/${block.id}.json`,
	};
	const [activeInstallTab, setActiveInstallTab] = useState<string>("npm");

	// Get the first example to show before installation
	const firstExample = block.examples[0];
	const remainingExamples = block.examples.slice(1);

	return (
		<div className="">
			<div className="">
				<Link
					to="/blocks"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to blocks
				</Link>
			</div>
			<div className="flex flex-col gap-12">
				{/* Title Section */}
				<div className="flex items-start justify-between">
					<div className="flex flex-col gap-0">
						<Label className="text-3xl font-bold">{block.name}</Label>
						{block.description && (
							<Label className="text-muted-foreground text-lg">
								{block.description}
							</Label>
						)}
					</div>
				</div>

				{/* First Example */}
				{firstExample && (
					<div className="flex-col flex border rounded-lg overflow-auto">
						<Tabs
							defaultValue="preview"
							className="gap-0"
							onValueChange={(value) => {
								if (value === "code") {
									loadExampleCode(firstExample.id);
								}
							}}
						>
							<div className="bg-card p-2 flex items-center justify-between gap-2">
								<TabsList>
									<TabsTrigger value="preview" asChild>
										<Button variant={"secondary"}>Preview</Button>
									</TabsTrigger>
									<TabsTrigger value="code" asChild>
										<Button variant={"secondary"}>Code</Button>
									</TabsTrigger>
								</TabsList>

								<ToggleGroup
									type="single"
									value={deviceSize}
									onValueChange={(value) =>
										handleSizeChange(firstExample.id, value)
									}
									variant="secondary"
									spacing={0}
								>
									<ToggleGroupItem value="desktop" title="Desktop" asChild>
										<Button variant={"default"}>
											<Monitor />
										</Button>
									</ToggleGroupItem>
									<ToggleGroupItem value="tablet" title="Tablet" asChild>
										<Button variant={"secondary"}>
											<Tablet />
										</Button>
									</ToggleGroupItem>
									<ToggleGroupItem value="mobile" title="Mobile" asChild>
										<Button variant={"secondary"}>
											<Smartphone />
										</Button>
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
							<TabsContent value="preview" className="p-3">
								<ResizablePanelGroup
									direction="horizontal"
									ref={(ref) => {
										if (ref) {
											panelGroupRefs.current.set(firstExample.id, ref);
										}
									}}
								>
									<ResizablePanel defaultSize={100} minSize={20}>
										<iframe
											title={`preview-${firstExample.id}`}
											src={`/preview/${firstExample.id}`}
											className="w-full"
											style={{
												height: firstExample.iframeHeight || "300px",
											}}
											loading="lazy"
										/>
									</ResizablePanel>
									<ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-1.5 after:-translate-y-1/2 after:-translate-x-px after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
									<ResizablePanel defaultSize={0} minSize={0} />
								</ResizablePanelGroup>
							</TabsContent>
							<TabsContent value="code" className="p-0">
								{loadingCodes.has(firstExample.id) ? (
									<div className="space-y-2">
										<Skeleton className="h-4 w-full" />
										<Skeleton className="h-4 w-3/4" />
										<Skeleton className="h-4 w-5/6" />
										<Skeleton className="h-4 w-2/3" />
									</div>
								) : exampleCodes.has(firstExample.id) ? (
									<CodeBlock code={exampleCodes.get(firstExample.id) ?? ""} />
								) : (
									<p className="text-muted-foreground">No code available</p>
								)}
							</TabsContent>
						</Tabs>
					</div>
				)}

				{/* Installation Section */}
				<div className="flex flex-col gap-3 w-full">
					<Label className="text-3xl font-bold">Installation</Label>
					<Tabs
						defaultValue="npm"
						className="gap-0 bg-card rounded-lg"
						onValueChange={(value) => setActiveInstallTab(value)}
					>
						<div className="flex items-center pt-2 px-2">
							<TabsList>
								<TabsTrigger value="npm">
									<IconBrandNpm />
									npm
								</TabsTrigger>
								<TabsTrigger value="pnpm">
									<IconBrandPnpm />
									pnpm
								</TabsTrigger>
								<TabsTrigger value="bun">
									<BunIcon stroke="currentColor" />
									bun
								</TabsTrigger>
							</TabsList>
							<Clipboard
								textToCopy={
									installSnippet[
										activeInstallTab as keyof typeof installSnippet
									]
								}
								className="ml-auto rounded h-7 w-7 bg-secondary hover:bg-secondary/80"
							/>
						</div>
						<div className="">
							<TabsContent
								value="npm"
								className="text-muted-foreground rounded-lg p-3"
							>
								<code>{installSnippet.npm}</code>
							</TabsContent>
							<TabsContent
								value="pnpm"
								className="text-muted-foreground rounded-lg p-3"
							>
								<code>{installSnippet.pnpm}</code>
							</TabsContent>
							<TabsContent
								value="bun"
								className="text-muted-foreground rounded-lg p-3"
							>
								<code>{installSnippet.bun}</code>
							</TabsContent>
						</div>
					</Tabs>
				</div>

				{/* MDX Documentation (Usage, About, etc.) */}
				{BlockDocsComponent && (
					<div className="prose max-w-none">
						<BlockDocsComponent />
					</div>
				)}

				{/* Remaining Examples */}
				{remainingExamples.length > 0 && (
					<div className="space-y-12">
						<h2 className="text-3xl font-bold">Examples</h2>
						{remainingExamples.map((example) => (
							<div key={example.id} className="space-y-4">
								<div className="space-y-2">
									<h3 className="text-2xl font-semibold">{example.name}</h3>
									{example.description && (
										<p className="text-muted-foreground">
											{example.description}
										</p>
									)}
								</div>
								<div className="flex-col flex border rounded-lg overflow-auto">
									<Tabs
										defaultValue="preview"
										className="gap-0"
										onValueChange={(value) => {
											if (value === "code") {
												loadExampleCode(example.id);
											}
										}}
									>
										<div className="bg-card p-2 flex items-center justify-between gap-2">
											<TabsList>
												<TabsTrigger value="preview" asChild>
													<Button variant={"secondary"}>Preview</Button>
												</TabsTrigger>
												<TabsTrigger value="code" asChild>
													<Button variant={"secondary"}>Code</Button>
												</TabsTrigger>
											</TabsList>

											<ToggleGroup
												type="single"
												value={deviceSize}
												onValueChange={(value) =>
													handleSizeChange(example.id, value)
												}
												variant="secondary"
												spacing={0}
											>
												<ToggleGroupItem
													value="desktop"
													title="Desktop"
													asChild
												>
													<Button variant={"default"}>
														<Monitor />
													</Button>
												</ToggleGroupItem>
												<ToggleGroupItem value="tablet" title="Tablet" asChild>
													<Button variant={"secondary"}>
														<Tablet />
													</Button>
												</ToggleGroupItem>
												<ToggleGroupItem value="mobile" title="Mobile" asChild>
													<Button variant={"secondary"}>
														<Smartphone />
													</Button>
												</ToggleGroupItem>
											</ToggleGroup>
										</div>
										<TabsContent value="preview" className="p-3">
											<ResizablePanelGroup
												direction="horizontal"
												ref={(ref) => {
													if (ref) {
														panelGroupRefs.current.set(example.id, ref);
													}
												}}
											>
												<ResizablePanel defaultSize={100} minSize={20}>
													<iframe
														title={`preview-${example.id}`}
														src={`/preview/${example.id}`}
														className="w-full"
														style={{
															height: example.iframeHeight || "300px",
														}}
														loading="lazy"
													/>
												</ResizablePanel>
												<ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-1.5 after:-translate-y-1/2 after:-translate-x-px after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
												<ResizablePanel defaultSize={0} minSize={0} />
											</ResizablePanelGroup>
										</TabsContent>
										<TabsContent value="code" className="p-0">
											{loadingCodes.has(example.id) ? (
												<div className="space-y-2">
													<Skeleton className="h-4 w-full" />
													<Skeleton className="h-4 w-3/4" />
													<Skeleton className="h-4 w-5/6" />
													<Skeleton className="h-4 w-2/3" />
												</div>
											) : exampleCodes.has(example.id) ? (
												<CodeBlock code={exampleCodes.get(example.id) ?? ""} />
											) : (
												<p className="text-muted-foreground">
													No code available
												</p>
											)}
										</TabsContent>
									</Tabs>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
