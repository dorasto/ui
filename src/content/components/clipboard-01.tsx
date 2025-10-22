"use client";

import SimpleClipboard from "@@/registry/clipboard/clipboard";
import { IconBrandNpm, IconBrandPnpm } from "@tabler/icons-react";
import { useState } from "react";
import BunIcon from "@/components/icons/bun";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClipboardDemo01() {
	const installSnippet = {
		npm: `npx shadcn@latest add`,
		pnpm: `pnpm dlx shadcn@latest add`,
		bun: `bunx --bun shadcn@latest add`,
	};
	const [activeInstallTab, setActiveInstallTab] = useState<string>("npm");
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<Tabs
				defaultValue="npm"
				className="gap-0 bg-card rounded-lg w-full"
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
					<SimpleClipboard
						textToCopy={
							installSnippet[activeInstallTab as keyof typeof installSnippet]
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
	);
}
