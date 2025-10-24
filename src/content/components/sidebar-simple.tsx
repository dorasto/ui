import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSubmenu,
	SidebarSubmenuItem,
	SidebarTrigger,
} from "@@/registry/sidebar/sidebar";
import { sidebarActions } from "@@/registry/sidebar/sidebar-store";
import { FileIcon, HomeIcon, SettingsIcon, UserIcon } from "lucide-react";
import * as React from "react";

/**
 * Simple Sidebar Example
 *
 * This example demonstrates the basic usage of the sidebar component:
 * - A collapsible sidebar with navigation items
 * - Submenus for organizing related items
 * - External control via store actions
 * - Mobile responsive (automatically uses Sheet on mobile)
 */
export function SimpleSidebarExample() {
	const [currentPage, setCurrentPage] = React.useState("home");

	return (
		<div className="flex h-screen bg-background">
			{/* Sidebar */}
			<Sidebar id="app-sidebar" collapsible defaultOpen>
				{/* Header with title and toggle button */}
				<SidebarHeader>
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">My Application</h2>
						<SidebarTrigger sidebarId="app-sidebar" />
					</div>
				</SidebarHeader>

				{/* Main navigation content */}
				<SidebarContent>
					{/* Main Navigation */}
					<SidebarGroup>
						<SidebarGroupLabel>Main</SidebarGroupLabel>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									sidebarId="app-sidebar"
									icon={<HomeIcon className="h-4 w-4" />}
									isActive={currentPage === "home"}
									tooltip="Home"
									onClick={() => setCurrentPage("home")}
								>
									Home
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>

					{/* Documents with Submenu */}
					<SidebarGroup>
						<SidebarGroupLabel>Content</SidebarGroupLabel>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarSubmenu
									sidebarId="app-sidebar"
									label="Documents"
									icon={<FileIcon className="h-4 w-4" />}
									defaultOpen
								>
									<SidebarSubmenuItem
										isActive={currentPage === "all-docs"}
										onClick={() => setCurrentPage("all-docs")}
									>
										All Documents
									</SidebarSubmenuItem>
									<SidebarSubmenuItem
										isActive={currentPage === "recent"}
										onClick={() => setCurrentPage("recent")}
									>
										Recent
									</SidebarSubmenuItem>
									<SidebarSubmenuItem
										isActive={currentPage === "favorites"}
										onClick={() => setCurrentPage("favorites")}
									>
										Favorites
									</SidebarSubmenuItem>
								</SidebarSubmenu>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>

					{/* Settings */}
					<SidebarGroup>
						<SidebarGroupLabel>System</SidebarGroupLabel>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									sidebarId="app-sidebar"
									icon={<SettingsIcon className="h-4 w-4" />}
									isActive={currentPage === "settings"}
									tooltip="Settings"
									onClick={() => setCurrentPage("settings")}
								>
									Settings
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>

				{/* Footer with user info */}
				<SidebarFooter>
					<div className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
							<UserIcon className="h-4 w-4" />
						</div>
						<div className="flex-1 overflow-hidden">
							<p className="truncate text-sm font-medium">User Name</p>
							<p className="truncate text-xs text-muted-foreground">
								user@email.com
							</p>
						</div>
					</div>
				</SidebarFooter>
			</Sidebar>

			{/* Main Content Area */}
			<main className="flex flex-1 flex-col overflow-auto">
				{/* Header */}
				<header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
					<div className="flex h-14 items-center gap-4 px-6">
						{/* Mobile trigger - only visible on small screens */}
						<SidebarTrigger sidebarId="app-sidebar" className="md:hidden" />

						<h1 className="text-xl font-semibold capitalize">
							{currentPage.replace("-", " ")}
						</h1>

						{/* External control example */}
						<button
							type="button"
							onClick={() => sidebarActions.toggleSidebar("app-sidebar")}
							className="ml-auto rounded-md border px-3 py-1 text-sm"
						>
							Toggle Sidebar (External)
						</button>
					</div>
				</header>

				{/* Page Content */}
				<div className="flex-1 p-6">
					<div className="mx-auto max-w-4xl space-y-6">
						<div className="rounded-lg border bg-card p-6">
							<h2 className="mb-2 text-lg font-semibold">
								Welcome to {currentPage.replace("-", " ")}
							</h2>
							<p className="text-muted-foreground">
								This is a simple example demonstrating the sidebar component.
								Try collapsing the sidebar or resizing your browser to see the
								mobile behavior.
							</p>
						</div>

						<div className="rounded-lg border bg-card p-6">
							<h3 className="mb-4 font-semibold">Key Features</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>✓ Collapsible sidebar with smooth transitions</li>
								<li>✓ Automatic tooltips when collapsed</li>
								<li>✓ Mobile responsive (Sheet on mobile)</li>
								<li>✓ External control via TanStack Store</li>
								<li>✓ Sticky positioning (no absolute positioning)</li>
								<li>✓ Support for nested submenus</li>
							</ul>
						</div>

						{/* Scrollable content */}
						<div className="rounded-lg border bg-card p-6">
							<h3 className="mb-4 font-semibold">Scroll Behavior</h3>
							<p className="mb-4 text-sm text-muted-foreground">
								Notice how the sidebar stays in place while you scroll this
								content. The sidebar uses sticky positioning.
							</p>
							<div className="space-y-2">
								{Array.from({ length: 30 }).map((_, index) => (
									<div
										key={`content-${index}`}
										className="rounded border p-3 text-sm"
									>
										Content block {index + 1}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
