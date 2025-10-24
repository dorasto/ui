import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@@/registry/sidebar/sidebar";
import { SidebarKeyboardHandler } from "@@/registry/sidebar/sidebar-script";
import {
	FileIcon,
	ImageIcon,
	LayoutIcon,
	MusicIcon,
	PaletteIcon,
	TypeIcon,
	VideoIcon,
} from "lucide-react";
import * as React from "react";

/**
 * Multiple Sidebars Example
 *
 * Demonstrates using multiple independent sidebars in a single layout.
 * Each sidebar has its own ID and can be controlled independently.
 * This example also shows keyboard shortcuts for toggling sidebars.
 */
export function MultipleSidebarsExample() {
	const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
	const [selectedTool, setSelectedTool] = React.useState<string | null>(null);

	return (
		<>
			{/* Add keyboard shortcut handler */}
			<SidebarKeyboardHandler />

			<div className="flex h-screen bg-background">
				{/* Left Sidebar - File Browser */}
				<Sidebar
					id="file-browser"
					side="left"
					defaultOpen
					width="14rem"
					collapsedWidth="3rem"
					keyboardShortcut="mod+b"
				>
					<SidebarHeader>
						<div className="flex items-center justify-between">
							<h2 className="text-sm font-semibold">Files</h2>
							<SidebarTrigger sidebarId="file-browser" />
						</div>
						<p className="text-xs text-muted-foreground">
							Press{" "}
							<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
								<span className="text-xs">⌘</span>B
							</kbd>{" "}
							to toggle
						</p>
					</SidebarHeader>

					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Media</SidebarGroupLabel>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										sidebarId="file-browser"
										icon={<ImageIcon className="h-4 w-4" />}
										isActive={selectedFile === "images"}
										tooltip="Images"
										onClick={() => setSelectedFile("images")}
									>
										Images
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton
										sidebarId="file-browser"
										icon={<VideoIcon className="h-4 w-4" />}
										isActive={selectedFile === "videos"}
										tooltip="Videos"
										onClick={() => setSelectedFile("videos")}
									>
										Videos
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton
										sidebarId="file-browser"
										icon={<MusicIcon className="h-4 w-4" />}
										isActive={selectedFile === "audio"}
										tooltip="Audio"
										onClick={() => setSelectedFile("audio")}
									>
										Audio
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroup>

						<SidebarGroup>
							<SidebarGroupLabel>Documents</SidebarGroupLabel>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										sidebarId="file-browser"
										icon={<FileIcon className="h-4 w-4" />}
										isActive={selectedFile === "documents"}
										tooltip="All Documents"
										onClick={() => setSelectedFile("documents")}
									>
										All Documents
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>

				{/* Main Content */}
				<main className="flex flex-1 flex-col overflow-auto">
					<header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
						<div className="flex items-center gap-4">
							<SidebarTrigger sidebarId="file-browser" className="md:hidden" />
							<h1 className="text-xl font-semibold">Multi-Sidebar Layout</h1>
							<SidebarTrigger
								sidebarId="tools-panel"
								className="ml-auto md:hidden"
							/>
						</div>
					</header>

					<div className="flex-1 p-6">
						<div className="mx-auto max-w-4xl space-y-6">
							<div className="rounded-lg border bg-card p-6">
								<h2 className="mb-2 text-lg font-semibold">
									Multiple Independent Sidebars
								</h2>
								<p className="text-sm text-muted-foreground">
									This example shows how to use multiple sidebars in a single
									layout. Each sidebar operates independently with its own state
									and keyboard shortcut.
								</p>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="rounded-lg border bg-card p-4">
									<h3 className="mb-2 font-semibold">Left Sidebar</h3>
									<p className="text-sm text-muted-foreground">
										File browser navigation
									</p>
									{selectedFile && (
										<p className="mt-2 text-sm">
											Selected:{" "}
											<span className="font-medium">{selectedFile}</span>
										</p>
									)}
								</div>

								<div className="rounded-lg border bg-card p-4">
									<h3 className="mb-2 font-semibold">Right Sidebar</h3>
									<p className="text-sm text-muted-foreground">
										Tools and properties panel
									</p>
									{selectedTool && (
										<p className="mt-2 text-sm">
											Active tool:{" "}
											<span className="font-medium">{selectedTool}</span>
										</p>
									)}
								</div>
							</div>

							<div className="rounded-lg border bg-card p-6">
								<h3 className="mb-4 font-semibold">Benefits</h3>
								<ul className="space-y-2 text-sm text-muted-foreground">
									<li>• Each sidebar has independent state</li>
									<li>• Can be positioned on either side</li>
									<li>• Custom widths for each sidebar</li>
									<li>• Both collapse independently</li>
									<li>• Mobile responsive with sheets</li>
									<li>• Keyboard shortcuts for quick toggling (⌘B, ⌘T)</li>
								</ul>
							</div>
						</div>
					</div>
				</main>

				{/* Right Sidebar - Tools */}
				<Sidebar
					id="tools-panel"
					side="right"
					defaultOpen
					width="16rem"
					collapsedWidth="3rem"
					keyboardShortcut="mod+p"
				>
					<SidebarHeader>
						<div className="flex items-center justify-between">
							<h2 className="text-sm font-semibold">Tools</h2>
							<SidebarTrigger sidebarId="tools-panel" />
						</div>
						<p className="text-xs text-muted-foreground">
							Press{" "}
							<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
								<span className="text-xs">⌘</span>T
							</kbd>{" "}
							to toggle
						</p>
					</SidebarHeader>

					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Design</SidebarGroupLabel>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										sidebarId="tools-panel"
										icon={<LayoutIcon className="h-4 w-4" />}
										isActive={selectedTool === "layout"}
										tooltip="Layout"
										onClick={() => setSelectedTool("layout")}
									>
										Layout
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton
										sidebarId="tools-panel"
										icon={<PaletteIcon className="h-4 w-4" />}
										isActive={selectedTool === "colors"}
										tooltip="Colors"
										onClick={() => setSelectedTool("colors")}
									>
										Colors
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton
										sidebarId="tools-panel"
										icon={<TypeIcon className="h-4 w-4" />}
										isActive={selectedTool === "typography"}
										tooltip="Typography"
										onClick={() => setSelectedTool("typography")}
									>
										Typography
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
			</div>
		</>
	);
}
