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
	SidebarMenuSub,
	SidebarSubmenu,
	SidebarSubmenuItem,
	SidebarTrigger,
} from "@@/registry/sidebar/sidebar";
import { sidebarActions } from "@@/registry/sidebar/sidebar-store";
import { IconCode, IconLayoutSidebar } from "@tabler/icons-react";
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
import { useIsMobile } from "@/hooks/use-mobile";
export function MainSidebar() {
	const [activePage, setActivePage] = React.useState("home");
	const sidebarId = "main-sidebar";
	const isMobile = useIsMobile();

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
		</Sidebar>
	);
}
