"use client";

import * as React from "react";
import { useStore } from "@tanstack/react-store";
import { ChevronDownIcon, PanelLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { sidebarStore, sidebarActions } from "./sidebar-store";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_COLLAPSED = "3.5rem";

// Hook to use sidebar
export function useSidebar(id: string) {
	const sidebar = useStore(sidebarStore, (state) => state.sidebars[id]);

	return {
		sidebar,
		toggle: (isMobile = false) => sidebarActions.toggleSidebar(id, isMobile),
		setOpen: (open: boolean, isMobile = false) =>
			sidebarActions.setOpen(id, open, isMobile),
		setVariant: (variant: "default" | "floating" | "inset") =>
			sidebarActions.setVariant(id, variant),
	};
}

// Sidebar Root
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	id: string;
	side?: "left" | "right";
	variant?: "default" | "floating" | "inset";
	collapsible?: boolean;
	defaultOpen?: boolean;
	width?: string;
	collapsedWidth?: string;
	keyboardShortcut?: string;
}

export function Sidebar({
	id,
	side = "left",
	variant = "default",
	collapsible = true,
	defaultOpen = true,
	width = SIDEBAR_WIDTH,
	collapsedWidth = SIDEBAR_WIDTH_COLLAPSED,
	keyboardShortcut,
	className,
	children,
	...props
}: SidebarProps) {
	const [isMobile, setIsMobile] = React.useState(false);
	const [isClient, setIsClient] = React.useState(false);
	const hasRegistered = React.useRef(false);
	
	// Subscribe to store state - this will have the persisted value on client
	const { sidebar } = useSidebar(id);
	
	// Mark when we're on the client
	React.useEffect(() => {
		setIsClient(true);
	}, []);
	
	// Register sidebar on mount
	React.useEffect(() => {
		if (hasRegistered.current) return;
		
		const existing = sidebarStore.state.sidebars[id];
		if (!existing) {
			sidebarActions.registerSidebar(id, {
				open: defaultOpen,
				variant,
				side,
				openMobile: false,
				keyboardShortcut,
			});
		} else if (keyboardShortcut !== existing.keyboardShortcut) {
			// Update keyboard shortcut if changed
			sidebarActions.setKeyboardShortcut(id, keyboardShortcut);
		}
		
		hasRegistered.current = true;
		
		return () => {
			hasRegistered.current = false;
			sidebarActions.unregisterSidebar(id);
		};
	}, [id, defaultOpen, variant, side, keyboardShortcut]);

	// Update CSS variable when sidebar state changes
	React.useEffect(() => {
		if (sidebar) {
			const newWidth = sidebar.open ? width : collapsedWidth;
			document.documentElement.style.setProperty(`--sidebar-${id}-width`, newWidth);
		}
	}, [sidebar?.open, id, width, collapsedWidth]);

	React.useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Use sidebar state if available, otherwise defaultOpen
	const isOpen = sidebar ? (isMobile ? sidebar.openMobile : sidebar.open) : defaultOpen;
	const currentWidth = isOpen ? width : collapsedWidth;

	// Mobile: show Sheet
	if (isMobile) {
		return (
			<Sheet
				open={sidebar ? sidebar.openMobile : false}
				onOpenChange={(open) => sidebarActions.setOpen(id, open, true)}
			>
				<SheetContent side={side} className="w-[18rem] p-0">
					<SheetHeader className="sr-only">
						<SheetTitle>Navigation</SheetTitle>
						<SheetDescription>Mobile navigation menu</SheetDescription>
					</SheetHeader>
					<div className="flex h-full flex-col">{children}</div>
				</SheetContent>
			</Sheet>
		);
	}

	const baseStyles = "sticky top-0 h-screen overflow-hidden";
	const variantStyles = {
		default: "bg-sidebar border-sidebar-border border-r",
		floating: "bg-sidebar border-sidebar-border m-2 rounded-lg border shadow-sm",
		inset: "bg-sidebar border-sidebar-border m-2 rounded-lg border shadow-sm",
	};

	// Server: render skeleton with CSS variable only (no content)
	// This prevents hydration mismatch because server doesn't know localStorage state
	if (!isClient) {
		return (
			<aside
				data-sidebar-id={id}
				data-variant={variant}
				data-side={side}
				style={{ 
					width: `var(--sidebar-${id}-width, ${defaultOpen ? width : collapsedWidth})`,
					minWidth: `var(--sidebar-${id}-width, ${defaultOpen ? width : collapsedWidth})`,
					maxWidth: `var(--sidebar-${id}-width, ${defaultOpen ? width : collapsedWidth})`
				}}
				className={cn(baseStyles, variantStyles[variant], className)}
				{...props}
			>
				{/* Skeleton - no content on server */}
				<div className="flex h-full flex-col overflow-hidden" style={{ width: `var(--sidebar-${id}-width, ${defaultOpen ? width : collapsedWidth})` }} />
			</aside>
		);
	}

	// Client: render full sidebar with content
	return (
		<TooltipProvider delayDuration={0}>
			<aside
				data-sidebar-id={id}
				data-state={isOpen ? "expanded" : "collapsed"}
				data-variant={variant}
				data-side={side}
				style={{ 
					width: `var(--sidebar-${id}-width, ${currentWidth})`,
					minWidth: `var(--sidebar-${id}-width, ${currentWidth})`,
					maxWidth: `var(--sidebar-${id}-width, ${currentWidth})`
				}}
				className={cn(baseStyles, variantStyles[variant], className)}
				{...props}
			>
				<div className="flex h-full flex-col overflow-hidden" style={{ width: `var(--sidebar-${id}-width, ${currentWidth})` }}>
					{children}
				</div>
			</aside>
		</TooltipProvider>
	);
}

// Sidebar Header
export function SidebarHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("flex flex-col gap-2 border-b p-4", className)}
			{...props}
		/>
	);
}

// Sidebar Content
export function SidebarContent({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("flex-1 overflow-y-auto overflow-x-hidden p-2", className)}
			{...props}
		/>
	);
}

// Sidebar Footer
export function SidebarFooter({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("mt-auto border-t p-4", className)}
			{...props}
		/>
	);
}

// Sidebar Group
export function SidebarGroup({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("flex flex-col gap-1 py-2", className)} {...props} />;
}

// Sidebar Group Label
export function SidebarGroupLabel({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"px-3 py-1.5 text-xs font-medium text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

// Sidebar Menu
export function SidebarMenu({
	className,
	...props
}: React.HTMLAttributes<HTMLUListElement>) {
	return <ul className={cn("flex flex-col gap-0.5", className)} {...props} />;
}

// Sidebar Menu Item
export function SidebarMenuItem({
	className,
	...props
}: React.HTMLAttributes<HTMLLIElement>) {
	return <li className={cn("relative", className)} {...props} />;
}

// Sidebar Menu Button
interface SidebarMenuButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean;
	tooltip?: string;
	sidebarId: string;
	asChild?: boolean;
	icon?: React.ReactNode;
}

export function SidebarMenuButton({
	isActive,
	tooltip,
	sidebarId,
	icon,
	className,
	children,
	...props
}: SidebarMenuButtonProps) {
	const { sidebar } = useSidebar(sidebarId);
	const isCollapsed = sidebar && !sidebar.open;

	const button = (
		<button
			type="button"
			data-active={isActive}
			className={cn(
				"flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
				"hover:bg-accent hover:text-accent-foreground",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				isActive && "bg-accent font-medium text-accent-foreground",
				className,
			)}
			{...props}
		>
			{icon && <span className="shrink-0">{icon}</span>}
			{!isCollapsed && <span className="flex-1 truncate">{children}</span>}
		</button>
	);

	if (isCollapsed && tooltip) {
		return (
			<Tooltip>
				<TooltipTrigger asChild>{button}</TooltipTrigger>
				<TooltipContent side="right">{tooltip}</TooltipContent>
			</Tooltip>
		);
	}

	return button;
}

// Sidebar Submenu
interface SidebarSubmenuProps extends React.HTMLAttributes<HTMLDivElement> {
	label: string;
	icon?: React.ReactNode;
	sidebarId: string;
	defaultOpen?: boolean;
}

export function SidebarSubmenu({
	label,
	icon,
	sidebarId,
	defaultOpen = false,
	className,
	children,
	...props
}: SidebarSubmenuProps) {
	const [isOpen, setIsOpen] = React.useState(defaultOpen);
	const { sidebar } = useSidebar(sidebarId);
	const isCollapsed = sidebar && !sidebar.open;

	const trigger = (
		<button
			type="button"
			onClick={() => setIsOpen(!isOpen)}
			className={cn(
				"flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
				"hover:bg-accent hover:text-accent-foreground",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
			)}
		>
			{icon && <span className="shrink-0">{icon}</span>}
			{!isCollapsed && (
				<>
					<span className="flex-1 truncate text-left">{label}</span>
					<ChevronDownIcon
						className={cn(
							"h-4 w-4 transition-transform",
							isOpen && "rotate-180",
						)}
					/>
				</>
			)}
		</button>
	);

	if (isCollapsed) {
		return (
			<Tooltip>
				<TooltipTrigger asChild>{trigger}</TooltipTrigger>
				<TooltipContent side="right">{label}</TooltipContent>
			</Tooltip>
		);
	}

	return (
		<div className={className} {...props}>
			{trigger}
			{isOpen && (
				<div className="ml-6 mt-1 flex flex-col gap-0.5 border-l pl-3">
					{children}
				</div>
			)}
		</div>
	);
}

// Sidebar Submenu Item
export function SidebarSubmenuItem({
	isActive,
	className,
	children,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }) {
	return (
		<button
			type="button"
			data-active={isActive}
			className={cn(
				"flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
				"hover:bg-accent hover:text-accent-foreground",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				isActive && "bg-accent font-medium text-accent-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}

// Sidebar Trigger
interface SidebarTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	sidebarId: string;
}

export function SidebarTrigger({
	sidebarId,
	className,
	...props
}: SidebarTriggerProps) {
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn("h-8 w-8", className)}
			onClick={() => sidebarActions.toggleSidebar(sidebarId, isMobile)}
			{...props}
		>
			<PanelLeftIcon className="h-4 w-4" />
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
}