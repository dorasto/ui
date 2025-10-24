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
import {
	BarChartIcon,
	BellIcon,
	DatabaseIcon,
	FileIcon,
	FolderIcon,
	HomeIcon,
	SettingsIcon,
	UserIcon,
	UsersIcon,
} from "lucide-react";
import * as React from "react";

export function MainSidebar() {
	const [activePage, setActivePage] = React.useState("home");

	return (
		<Sidebar id="main-sidebar" collapsible variant="floating" className="">
			<SidebarHeader>
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">My App</h2>
					<SidebarTrigger sidebarId="main-sidebar" />
				</div>
			</SidebarHeader>

			<SidebarContent>
				{/* Navigation Group */}
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								sidebarId="main-sidebar"
								icon={<HomeIcon className="h-4 w-4" />}
								isActive={activePage === "home"}
								tooltip="Home"
								onClick={() => setActivePage("home")}
							>
								Home
							</SidebarMenuButton>
						</SidebarMenuItem>

						<SidebarMenuItem>
							<SidebarMenuButton
								sidebarId="main-sidebar"
								icon={<BellIcon className="h-4 w-4" />}
								isActive={activePage === "notifications"}
								tooltip="Notifications"
								onClick={() => setActivePage("notifications")}
							>
								Notifications
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>

				{/* Projects Group with Submenu */}
				<SidebarGroup>
					<SidebarGroupLabel>Projects</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarSubmenu
								sidebarId="main-sidebar"
								label="Projects"
								icon={<FolderIcon className="h-4 w-4" />}
								defaultOpen
							>
								<SidebarSubmenuItem
									isActive={activePage === "project-1"}
									onClick={() => setActivePage("project-1")}
								>
									Website Redesign
								</SidebarSubmenuItem>
								<SidebarSubmenuItem
									isActive={activePage === "project-2"}
									onClick={() => setActivePage("project-2")}
								>
									Mobile App
								</SidebarSubmenuItem>
								<SidebarSubmenuItem
									isActive={activePage === "project-3"}
									onClick={() => setActivePage("project-3")}
								>
									API Development
								</SidebarSubmenuItem>
							</SidebarSubmenu>
						</SidebarMenuItem>

						<SidebarMenuItem>
							<SidebarSubmenu
								sidebarId="main-sidebar"
								label="Documents"
								icon={<FileIcon className="h-4 w-4" />}
							>
								<SidebarSubmenuItem
									isActive={activePage === "doc-1"}
									onClick={() => setActivePage("doc-1")}
								>
									Getting Started
								</SidebarSubmenuItem>
								<SidebarSubmenuItem
									isActive={activePage === "doc-2"}
									onClick={() => setActivePage("doc-2")}
								>
									API Reference
								</SidebarSubmenuItem>

								{/* Nested Submenu Example */}
								<div className="ml-2 mt-1 space-y-1">
									<div className="text-xs font-medium text-muted-foreground px-2 py-1">
										Guides
									</div>
									<SidebarSubmenuItem
										isActive={activePage === "guide-1"}
										onClick={() => setActivePage("guide-1")}
									>
										Installation
									</SidebarSubmenuItem>
									<SidebarSubmenuItem
										isActive={activePage === "guide-2"}
										onClick={() => setActivePage("guide-2")}
									>
										Configuration
									</SidebarSubmenuItem>
								</div>
							</SidebarSubmenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>

				{/* Data Group */}
				<SidebarGroup>
					<SidebarGroupLabel>Data</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								sidebarId="main-sidebar"
								icon={<DatabaseIcon className="h-4 w-4" />}
								isActive={activePage === "database"}
								tooltip="Database"
								onClick={() => setActivePage("database")}
							>
								Database
							</SidebarMenuButton>
						</SidebarMenuItem>

						<SidebarMenuItem>
							<SidebarMenuButton
								sidebarId="main-sidebar"
								icon={<BarChartIcon className="h-4 w-4" />}
								isActive={activePage === "analytics"}
								tooltip="Analytics"
								onClick={() => setActivePage("analytics")}
							>
								Analytics
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>

				{/* Settings Group */}
				<SidebarGroup>
					<SidebarGroupLabel>Settings</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								sidebarId="main-sidebar"
								icon={<UsersIcon className="h-4 w-4" />}
								isActive={activePage === "team"}
								tooltip="Team"
								onClick={() => setActivePage("team")}
							>
								Team
							</SidebarMenuButton>
						</SidebarMenuItem>

						<SidebarMenuItem>
							<SidebarMenuButton
								sidebarId="main-sidebar"
								icon={<SettingsIcon className="h-4 w-4" />}
								isActive={activePage === "settings"}
								tooltip="Settings"
								onClick={() => setActivePage("settings")}
							>
								Settings
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<div className="flex items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
						<UserIcon className="h-4 w-4" />
					</div>
					<div className="flex-1 overflow-hidden">
						<p className="truncate text-sm font-medium">John Doe</p>
						<p className="truncate text-xs text-muted-foreground">
							john@example.com
						</p>
					</div>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
