"use client";

import Clipboard from "@@/registry/clipboard/clipboard";
import {
	IconBrandNpm,
	IconBrandPnpm,
	IconCheck,
	IconCopy,
} from "@tabler/icons-react";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import BunIcon from "@/components/icons/bun";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

// Example 01: Tabs with code copy
export function Example01() {
	const installSnippet = {
		npm: `npx shadcn@latest add`,
		pnpm: `pnpm dlx shadcn@latest add`,
		bun: `bunx --bun shadcn@latest add`,
	};
	const [activeInstallTab, setActiveInstallTab] = useState<string>("npm");
	const isMobile = useIsMobile();

	const packageManagers = [
		{ value: "npm", label: "npm", icon: <IconBrandNpm /> },
		{ value: "pnpm", label: "pnpm", icon: <IconBrandPnpm /> },
		{ value: "bun", label: "bun", icon: <BunIcon stroke="currentColor" /> },
	];

	const activePackageManager = packageManagers.find(
		(pm) => pm.value === activeInstallTab,
	);

	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<Tabs
				value={activeInstallTab}
				className="gap-0 bg-card rounded-lg w-full"
				onValueChange={(value) => setActiveInstallTab(value)}
			>
				<div className="flex items-center pt-2 px-2">
					{isMobile ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm">
								{activePackageManager?.icon}
								{activePackageManager?.label}
								<ChevronDownIcon className="size-4" />
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								{packageManagers.map((pm) => (
									<DropdownMenuItem
										key={pm.value}
										onClick={() => setActiveInstallTab(pm.value)}
										className="gap-2"
									>
										{pm.icon}
										{pm.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
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
					)}
					<Clipboard
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

// Example 02: Custom button with clipboard
export function Example02() {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<div className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 gap-9">
				<div className="space-y-0.5">
					<p className="text-xs font-medium">Email</p>
					<p className="text-xs font-mono text-muted-foreground">
						me@example.com
					</p>
				</div>
				<Clipboard textToCopy={"me@example.com"} onCopy={handleCopy}>
					<Button variant={copied ? "default" : "outline"} size={"icon-lg"}>
						{copied ? <IconCheck /> : <IconCopy />}
					</Button>
				</Clipboard>
			</div>
		</div>
	);
}

// Example 03: Simple clipboard
export function Example03() {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<Clipboard textToCopy={"Text to copy"} />
		</div>
	);
}
