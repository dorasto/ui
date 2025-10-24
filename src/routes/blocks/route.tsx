import { SidebarTrigger } from "@@/registry/sidebar/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/Header";
import { SidebarExample } from "@/content/components/sidebar-example";
import { MultipleSidebarsExample } from "@/content/components/sidebar-multiple";

export const Route = createFileRoute("/blocks")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex">
			<MultipleSidebarsExample />
			<Header />
			<div className="container mx-auto py-8 px-4">
				<SidebarTrigger sidebarId="main-sidebar" />
				<Outlet />
			</div>
		</div>
	);
}
