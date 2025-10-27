import { SidebarTrigger } from "@@/registry/sidebar/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/Header";
import { MainSidebar } from "@/components/layout/sidebar";
import { SidebarExample } from "@/content/components/sidebar-example";
import { MultipleSidebarsExample } from "@/content/components/sidebar-multiple";

export const Route = createFileRoute("/blocks")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-dvh relative overflow-hidden">
			<MainSidebar />
			<div className="flex-1 overflow-auto">
				<div className="container mx-auto lg:w-5xl py-8 px-4">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
