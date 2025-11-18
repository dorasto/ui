"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarSubmenu,
	SidebarSubmenuItem,
	SidebarTrigger,
} from "@@/registry/sidebar/sidebar";
import {
	sidebarActions,
	sidebarStore,
} from "@@/registry/sidebar/sidebar-store";
import {
	IconBlocks,
	IconBook,
	IconBrandGithub,
	IconChevronRight,
	IconCreditCard,
	IconHome,
	IconLayoutSidebar,
	IconPageBreak,
	IconStack2,
	IconUsers,
	IconX,
} from "@tabler/icons-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import * as React from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { blocksMetadata } from "@/content/blocks-metadata";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import OurIcon from "../../components/icons/ouricon";
export function Example01() {
	const sidebarId = "preview-sidebar";
	const isMobile = useIsMobile();

	// Get the current pathname - similar to usePathname in Next.js
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	// Check if we're on the blocks page or any block detail page
	const isBlocksActive = pathname.startsWith("/blocks");

	// Initialize collapsible state based on route, but allow user to toggle freely
	const [componentsOpen, setComponentsOpen] = React.useState(isBlocksActive);

	// Access sidebar state directly from the store
	const isSidebarOpen = sidebarStore.state.sidebars[sidebarId]?.open ?? true;

	return (
		<div className="flex min-h-screen">
			<div className="flex h-dvh relative overflow-hidden">
				<Sidebar
					id={sidebarId}
					collapsible
					variant="floating"
					className=""
					keyboardShortcut="p"
				>
					<SidebarHeader>
						<SidebarMenuItem>
							<a href="#" className="w-full">
								<SidebarMenuButton
									size="large"
									icon={<OurIcon />}
									tooltip="Doras UI"
								>
									Doras UI
								</SidebarMenuButton>
							</a>
							{isMobile ? (
								<SidebarMenuSub>
									<SidebarMenuButton
										icon={<IconX />}
										className="hover:bg-muted! aspect-square"
										tooltip="Expand"
										onClick={() =>
											sidebarActions.toggleSidebar(sidebarId, isMobile)
										}
									/>
								</SidebarMenuSub>
							) : (
								<SidebarMenuSub>
									<SidebarMenuButton
										icon={<IconLayoutSidebar />}
										className="hover:bg-muted! aspect-square"
										tooltip="Expand"
										onClick={() =>
											sidebarActions.toggleSidebar(sidebarId, isMobile)
										}
									/>
								</SidebarMenuSub>
							)}
						</SidebarMenuItem>
						<SidebarMenuItem showWhenCollapsed>
							<SidebarMenuButton
								icon={<IconLayoutSidebar />}
								tooltip="Expand"
								onClick={() =>
									sidebarActions.toggleSidebar(sidebarId, isMobile)
								}
							/>
						</SidebarMenuItem>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarMenu>
								<Collapsible
									open={componentsOpen}
									onOpenChange={setComponentsOpen}
									className="flex flex-col gap-0.5"
								>
									{/* Example: Change isActive based on sidebar state */}
									<SidebarMenuItem
										isActive={
											isSidebarOpen
												? pathname === "/blocks"
												: pathname.startsWith("/blocks")
										}
									>
										<a href="#" className="w-full">
											<SidebarMenuButton
												icon={<IconBlocks />}
												tooltip="Components"
												size="large"
											>
												Components
											</SidebarMenuButton>
										</a>
										<SidebarMenuSub>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton
													icon={
														<IconChevronRight
															className={cn(
																"transition-all",
																componentsOpen
																	? "rotate-90 transition-all"
																	: "",
															)}
														/>
													}
													className="hover:bg-muted! aspect-square transition-transform"
													tooltip={componentsOpen ? "Collapse" : "Expand"}
												/>
											</CollapsibleTrigger>
										</SidebarMenuSub>
									</SidebarMenuItem>
									<CollapsibleContent className="flex flex-col gap-0.5">
										{blocksMetadata
											.filter((block) => !block.preview)
											.map((block) => {
												const isActive = pathname === `/blocks/${block.id}`;

												return (
													<SidebarMenuItem
														key={block.id}
														isActive={isActive}
														hideWhenCollapsed
													>
														<a href="#" className="w-full">
															<SidebarMenuButton
																icon={
																	block.icon ? (
																		<block.icon className="h-4 w-4" />
																	) : null
																}
																tooltip={block.name}
															>
																{block.name}
															</SidebarMenuButton>
														</a>
													</SidebarMenuItem>
												);
											})}
									</CollapsibleContent>
								</Collapsible>
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter>
						<a href="#">
							<SidebarMenuItem>
								<SidebarMenuButton icon={<IconBrandGithub />} tooltip="GitHub">
									GitHub
								</SidebarMenuButton>
							</SidebarMenuItem>
						</a>
						<SidebarMenuItem className="hover:bg-transparent">
							<SidebarSubmenu
								label="Other Projects"
								icon={<IconStack2 className="h-4 w-4" />}
								forcePopup={true}
							>
								<a href="https://doras.to?ref=uicomponentlibrary">
									<SidebarSubmenuItem>Doras.to</SidebarSubmenuItem>
								</a>
							</SidebarSubmenu>
						</SidebarMenuItem>
					</SidebarFooter>
				</Sidebar>
				<div className="flex-1 overflow-auto">
					<div className="container mx-auto lg:w-5xl py-8 px-4">
						{isMobile && <SidebarTrigger sidebarId="preview-sidebar" />}
						Body of content
					</div>
				</div>
			</div>
		</div>
	);
}

export function Example02() {
	const sidebarId = "right-sidebar";
	const isMobile = useIsMobile();

	return (
		<div className="flex min-h-screen">
			<div className="flex h-dvh relative overflow-hidden w-full">
				<div className="flex-1 overflow-auto">
					<div className="container mx-auto lg:w-5xl py-8 px-4">
						<h1 className="text-2xl font-bold mb-4">Right Sidebar Example</h1>
						<p>The sidebar is on the right side.</p>
						{isMobile && <SidebarTrigger sidebarId="right-sidebar" />}
					</div>
				</div>
				<Sidebar id={sidebarId} side="right" collapsible keyboardShortcut="r">
					<SidebarHeader>
						<SidebarMenuItem>
							<SidebarMenuButton
								size="large"
								icon={<OurIcon />}
								tooltip="Doras UI"
							>
								Right Sidebar
							</SidebarMenuButton>
							<SidebarMenuSub>
								<SidebarMenuButton
									icon={<IconLayoutSidebar />}
									className="hover:bg-muted! aspect-square"
									tooltip="Expand"
									onClick={() =>
										sidebarActions.toggleSidebar(sidebarId, isMobile)
									}
								/>
							</SidebarMenuSub>
						</SidebarMenuItem>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton icon={<IconBlocks />}>
										Item 1
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton icon={<IconBlocks />}>
										Item 2
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
			</div>
		</div>
	);
}

export function Example03() {
	const sidebarId = "multi-sidebar";
	const secondSidebarId = "secondary-sidebar";
	const isMobile = useIsMobile();

	const activeItem = useStore(
		sidebarStore,
		(state) => state.sidebars[sidebarId]?.activeItem,
	);

	React.useEffect(() => {
		if (!activeItem) {
			sidebarActions.setActiveItem(sidebarId, "home");
		}
	}, [activeItem]);

	return (
		<div className="flex min-h-screen">
			<div className="flex h-dvh relative overflow-hidden w-full">
				<Sidebar
					id={sidebarId}
					collapsible={false}
					variant="floating"
					width="3.5rem"
					rootClassName="mr-0 "
					className="rounded-r-none border border-r-0"
					isCollapsed={true}
				>
					<SidebarHeader>
						<SidebarMenuItem>
							<SidebarMenuButton icon={<OurIcon />} />
						</SidebarMenuItem>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarMenu>
								<SidebarMenuItem isActive={activeItem === "home"}>
									<SidebarMenuButton
										icon={<IconHome />}
										tooltip="Home"
										onClick={() =>
											sidebarActions.setActiveItem(sidebarId, "home")
										}
									/>
								</SidebarMenuItem>
								<SidebarMenuItem isActive={activeItem === "payment"}>
									<SidebarMenuButton
										icon={<IconCreditCard />}
										tooltip="Payment"
										onClick={() =>
											sidebarActions.setActiveItem(sidebarId, "payment")
										}
									/>
								</SidebarMenuItem>
								<SidebarMenuItem isActive={activeItem === "users"}>
									<SidebarMenuButton
										icon={<IconUsers />}
										tooltip="Users"
										onClick={() =>
											sidebarActions.setActiveItem(sidebarId, "users")
										}
									/>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<Sidebar
					id={secondSidebarId}
					collapsible={false}
					variant="default"
					width="14rem"
					className="rounded-r-md border-r border-y bg-popover"
					rootClassName="m-3 ml-0"
				>
					<SidebarHeader>
						<SidebarMenuItem>
							<SidebarMenuButton className="font-semibold cursor-default">
								{activeItem === "home" && "Home"}
								{activeItem === "payment" && "Payment"}
								{activeItem === "users" && "Users"}
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarMenu>
								{activeItem === "home" && (
									<>
										<SidebarMenuItem>
											<SidebarMenuButton>Overview</SidebarMenuButton>
										</SidebarMenuItem>
										<SidebarMenuItem>
											<SidebarMenuButton>Activity</SidebarMenuButton>
										</SidebarMenuItem>
										<SidebarMenuItem>
											<SidebarMenuButton>Settings</SidebarMenuButton>
										</SidebarMenuItem>
									</>
								)}
								{activeItem === "payment" && (
									<>
										<SidebarMenuItem>
											<SidebarMenuButton>Invoices</SidebarMenuButton>
										</SidebarMenuItem>
										<SidebarMenuItem>
											<SidebarMenuButton>Payment Methods</SidebarMenuButton>
										</SidebarMenuItem>
										<SidebarMenuItem>
											<SidebarMenuButton>Billing History</SidebarMenuButton>
										</SidebarMenuItem>
									</>
								)}
								{activeItem === "users" && (
									<>
										<SidebarMenuItem>
											<SidebarMenuButton>Team Members</SidebarMenuButton>
										</SidebarMenuItem>
										<SidebarMenuItem>
											<SidebarMenuButton>Permissions</SidebarMenuButton>
										</SidebarMenuItem>
										<SidebarMenuItem>
											<SidebarMenuButton>Invites</SidebarMenuButton>
										</SidebarMenuItem>
									</>
								)}
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<div className="flex-1 overflow-auto">
					<div className="container mx-auto lg:w-5xl py-8 px-4">
						<h1 className="text-2xl font-bold mb-4">Multiple sidebars</h1>
						<p className="mb-4">
							The content of the secondary sidebar changes based on the
							selection in the primary sidebar. This state is managed by the
							sidebar store.
						</p>
						<div className="p-4 border rounded-lg bg-muted/50">
							<p className="font-mono text-sm">
								Active Item: <strong>{activeItem}</strong>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
