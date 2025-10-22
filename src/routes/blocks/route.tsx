import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/Header";

export const Route = createFileRoute("/blocks")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Header />
			<div className="container mx-auto py-8 px-4">
				<Outlet />
			</div>
		</div>
	);
}
