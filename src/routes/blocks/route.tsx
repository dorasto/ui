import { SidebarTrigger } from "@@/registry/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MainSidebar } from "@/components/layout/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/blocks")({
	component: RouteComponent,
	head: () => ({
		meta: seo({
			title: "UI Components & Blocks | Doras UI",
			description:
				"Browse our collection of beautiful, production-ready React components. Copy, paste, and customize UI blocks for your projects.",
			keywords:
				"ui components, react blocks, component library, tanstack router, shadcn, ui design, web components",
		}),
	}),
});

function RouteComponent() {
	const isMobile = useIsMobile();
	return (
		<div className="flex h-dvh relative overflow-hidden">
			<MainSidebar />
			<div className="flex-1 overflow-auto">
				<div className="container mx-auto lg:w-5xl py-8 px-4">
					{isMobile && <SidebarTrigger sidebarId="main-sidebar" />}
					<Outlet />
				</div>
			</div>
		</div>
	);
}
