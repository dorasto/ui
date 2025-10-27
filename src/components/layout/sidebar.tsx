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
} from "@@/registry/sidebar/sidebar";
import { sidebarActions } from "@@/registry/sidebar/sidebar-store";
import {
	IconBlocks,
	IconBrandGithub,
	IconChevronRight,
	IconCode,
	IconLayoutSidebar,
	IconStack2,
} from "@tabler/icons-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, UserIcon } from "lucide-react";
import path from "path";
import * as React from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { blocksMetadata } from "@/content/blocks-metadata";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
export function MainSidebar() {
	const sidebarId = "main-sidebar";
	const isMobile = useIsMobile();

	// Get the current pathname - similar to usePathname in Next.js
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	// Check if we're on the blocks page or any block detail page
	const isBlocksActive = pathname.startsWith("/blocks");

	// Initialize collapsible state based on route, but allow user to toggle freely
	const [componentsOpen, setComponentsOpen] = React.useState(isBlocksActive);

	return (
		<Sidebar id={sidebarId} collapsible variant="floating" className="">
			<SidebarHeader>
				<SidebarMenuItem>
					<SidebarMenuButton icon={<IconCode />} tooltip="TomUI">
						TomUI
					</SidebarMenuButton>
					<SidebarMenuSub>
						<SidebarMenuButton
							icon={<IconLayoutSidebar />}
							className="hover:bg-muted! aspect-square"
							tooltip="Expand"
							onClick={() => sidebarActions.toggleSidebar(sidebarId, isMobile)}
						/>
					</SidebarMenuSub>
				</SidebarMenuItem>
				<SidebarMenuItem showWhenCollapsed>
					<SidebarMenuButton
						icon={<IconLayoutSidebar />}
						tooltip="Expand"
						onClick={() => sidebarActions.toggleSidebar(sidebarId, isMobile)}
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
							<SidebarMenuItem isActive={pathname === "/blocks"}>
								<Link to="/blocks" className="w-full">
									<SidebarMenuButton
										icon={<IconBlocks />}
										tooltip="Components"
										size="large"
									>
										Components
									</SidebarMenuButton>
								</Link>
								<SidebarMenuSub>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton
											icon={
												<IconChevronRight
													className={cn(
														"transition-all",
														componentsOpen ? "rotate-90 transition-all" : "",
													)}
												/>
											}
											className="hover:bg-muted! aspect-square transition-transform"
											tooltip={componentsOpen ? "Collapse" : "Expand"}
										/>
									</CollapsibleTrigger>
								</SidebarMenuSub>
							</SidebarMenuItem>
							<CollapsibleContent className="">
								{blocksMetadata.map((block) => {
									const isActive = pathname === `/blocks/${block.id}`;

									return (
										<SidebarMenuItem
											key={block.id}
											isActive={isActive}
											hideWhenCollapsed
										>
											<Link
												to="/blocks/$blockId"
												className="w-full"
												params={{ blockId: block.id }}
											>
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
											</Link>
										</SidebarMenuItem>
									);
								})}
							</CollapsibleContent>
						</Collapsible>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Link to="/">
					<SidebarMenuItem>
						<SidebarMenuButton icon={<IconBrandGithub />} tooltip="GitHub">
							GitHub
						</SidebarMenuButton>
					</SidebarMenuItem>
				</Link>
				<SidebarMenuItem className="hover:bg-transparent">
					<SidebarSubmenu
						label="Other Projects"
						icon={<IconStack2 className="h-4 w-4" />}
						forcePopup={true}
					>
						<Link to="https://doras.to?ref=uicomponentlibrary" target="_blank">
							<SidebarSubmenuItem>Doras.to</SidebarSubmenuItem>
						</Link>
					</SidebarSubmenu>
				</SidebarMenuItem>
			</SidebarFooter>
		</Sidebar>
	);
}
