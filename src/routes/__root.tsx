import { SidebarScript } from "@@/registry/sidebar";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";
import { defaultSEO, seo } from "../utils/seo";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				title: defaultSEO.title,
				description: defaultSEO.description,
				keywords: defaultSEO.keywords,
			}),
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg",
			},
		],
	}),

	notFoundComponent: () => {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
				<h1 className="text-4xl font-bold">404</h1>
				<p className="text-muted-foreground">Page not found</p>
				<a
					href="/"
					className="text-primary underline underline-offset-4 hover:text-primary/80"
				>
					Go back home
				</a>
			</div>
		);
	},

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<SidebarScript />
				<HeadContent />
			</head>
			<body className="dark">
				{children}
				{process.env.NODE_ENV !== "production" && (
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
						]}
					/>
				)}
				<Scripts />
			</body>
		</html>
	);
}
