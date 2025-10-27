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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { sidebarStore, sidebarActions } from "./sidebar-store";
import { Skeleton } from "@/components/ui/skeleton";
import { IconChevronRight } from "@tabler/icons-react";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_COLLAPSED = "3.5rem";

// Context for sidebar ID
const SidebarContext = React.createContext<string | null>(null);

// Hook to get sidebar ID from context
function useSidebarId() {
	const id = React.useContext(SidebarContext);
	if (!id) {
		throw new Error("Sidebar components must be used within a Sidebar component");
	}
	return id;
}

// Hook to use sidebar
export function useSidebar(id?: string) {
	const contextId = React.useContext(SidebarContext);
	const sidebarId = id ?? contextId;
	
	if (!sidebarId) {
		throw new Error("useSidebar must be called with an id or within a Sidebar component");
	}
	
	const sidebar = useStore(sidebarStore, (state) => state.sidebars[sidebarId]);

	return {
		sidebar,
		toggle: (isMobile = false) => sidebarActions.toggleSidebar(sidebarId, isMobile),
		setOpen: (open: boolean, isMobile = false) =>
			sidebarActions.setOpen(sidebarId, open, isMobile),
		setVariant: (variant: "default" | "floating") =>
			sidebarActions.setVariant(sidebarId, variant),
	};
}

// Sidebar Root
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	id: string;
	side?: "left" | "right";
	variant?: "default" | "floating";
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
			<SidebarContext.Provider value={id}>
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
			</SidebarContext.Provider>
		);
	}

	const baseStyles = "sticky top-0 h-full overflow-hidden transition-all";
    	const variantRootStyles = {
		default: "h-full",
		floating: "m-3",
	};
	const variantStyles = {
		default: "bg-sidebar",
		floating: "bg-sidebar rounded-lg border",
	};

	// Server: render skeleton with CSS variable only (no content)
	// This prevents hydration mismatch because server doesn't know localStorage state
	if (!isClient) {
		return (
            <div className={cn(variantRootStyles[variant])}>
			<aside
				data-sidebar-id={id}
				data-variant={variant}
				data-side={side}
				style={{ 
					width: `var(--sidebar-${id}-width, ${defaultOpen ? width : collapsedWidth})`,
					minWidth: `var(--sidebar-${id}-width, ${defaultOpen ? width : collapsedWidth})`,
					maxWidth: `var(--sidebar-${id}-width, ${defaultOpen ? width : collapsedWidth})`
				}}
				className={cn(baseStyles, variantStyles[variant], className, "animate-pulse border-transparent")}
				{...props}
			>
				{/* Skeleton - no content on server */}
				<div className="flex h-full flex-col overflow-hidden" style={{ width: `var(--sidebar-${id}-width, ${defaultOpen ? width : collapsedWidth})` }} >
                    <div className="flex flex-col gap-0.5 p-2">
                    <Skeleton className="w-full h-9 opacity-10"/>
                     <Skeleton className="w-full h-9 opacity-10"/>
                      <Skeleton className="w-full h-9 opacity-10"/>
                    </div>
                </div>
			</aside>
            </div>
		);
	}

	// Client: render full sidebar with content
	return (
		<SidebarContext.Provider value={id}>
			<TooltipProvider delayDuration={0}>
				<div className={cn(variantRootStyles[variant])}>
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
				</div>
			</TooltipProvider>
		</SidebarContext.Provider>
	);
}

// Sidebar Header
export function SidebarHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("flex flex-col gap-0.5 p-2", className)}
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
			className={cn("mt-auto border-t p-2", className)}
			{...props}
		/>
	);
}

// Sidebar Group
export function SidebarGroup({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("flex flex-col gap-0.5", className)} {...props} />;
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
	return <ul className={cn("flex flex-col 0.5", className)} {...props} />;
}

// Sidebar Menu Item
interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
    isActive?: boolean;
    isCollapsed?: boolean;
	showWhenCollapsed?: boolean;
	hideWhenCollapsed?: boolean;
}

export function SidebarMenuItem({
	className,
    isActive,
    isCollapsed,
	showWhenCollapsed,
	hideWhenCollapsed,
	children,
	...props
}: SidebarMenuItemProps) {
	const { sidebar } = useSidebar();
	const collapsed = sidebar && !sidebar.open;
	
	// Hide when collapsed if hideWhenCollapsed is true
	if (hideWhenCollapsed && collapsed) return null;
	
	// Hide when expanded if showWhenCollapsed is true
	if (showWhenCollapsed && !collapsed) return null;
	
	return <li className={cn("relative duration-150 flex w-full items-center gap-1 shrink-0 px-1",
        "flex w-full items-center gap-3 transition-all justify-start text-left flex-1 group/item rounded-lg text-sm",

				"hover:bg-accent hover:text-accent-foreground",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				isActive && "bg-accent font-medium text-accent-foreground",
                (isCollapsed || collapsed) && "justify-center aspect-square",
                
				 className)} data-active={isActive} {...props}>{children}</li>;
}

// Sidebar Menu Sub
export function SidebarMenuSub({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const { sidebar } = useSidebar();
	const isCollapsed = sidebar && !sidebar.open;
	
	if (isCollapsed) return null;
	
	return <div className={cn("flex items-center gap-1 w-fit", className)} {...props}>{children}</div>;
}

// Sidebar Menu Button
interface SidebarMenuButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean;
	tooltip?: string;
	asChild?: boolean;
	icon?: React.ReactNode;
    size?: "default" | "large";
}

export function SidebarMenuButton({
	isActive,
	tooltip,
	icon,
	className,
	children,
    size,
	...props
}: SidebarMenuButtonProps) {
	const { sidebar } = useSidebar();
	const isCollapsed = sidebar && !sidebar.open;

	const button = (
		<button
			type="button"
			data-active={isActive}
			className={cn(
				"flex w-full items-center gap-3 text-inherit duration-150 transition-all justify-start text-left flex-1 rounded-lg p-2",
				"",
				"focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent",
                size === "large" && "font-semibold py-3",
				isActive && "bg-accent font-medium text-accent-foreground",
                isCollapsed && "justify-center aspect-square",
				className,
			)}
			{...props}
		>
			{icon && <span className={cn("[&>svg]:size-4 [&>svg]:shrink-0")}>{icon}</span>}
            {children ? (
                !isCollapsed && <span className="flex-1 truncate">{children}</span>
            ) : null
            }
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
	defaultOpen?: boolean;
    forcePopup?: boolean;
}

export function SidebarSubmenu({
	label,
	icon,
	defaultOpen = false,
	className,
	children,
    forcePopup = false,
	...props
}: SidebarSubmenuProps) {
	const [isOpen, setIsOpen] = React.useState(defaultOpen);
	const { sidebar } = useSidebar();
	const isCollapsed = sidebar && !sidebar.open;

	const trigger = (
		<button
			type="button"
			onClick={() => !isCollapsed && setIsOpen(!isOpen)}
			className={cn(
				"flex w-full min-w-full items-center gap-3 text-inherit duration-150 transition-all justify-start text-left flex-1 rounded-lg p-2",
				"hover:bg-accent hover:font-medium hover:text-accent-foreground",
				"focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent",
                !isCollapsed && isOpen && "bg-accent font-medium text-accent-foreground"
			)}
		>
			{icon && <span className={cn("shrink-0", "[&>svg]:size-4")}>{icon}</span>}
			{!isCollapsed && (
				<>
					<span className="flex-1 truncate text-left">{label}</span>
                    <IconChevronRight
						className={cn(
						"transition-all size-4",
						isOpen ? "rotate-90 transition-all" : "",
						)}
						/>
				</>
			)}
		</button>
	);

	if (forcePopup) {
		return (
			<Popover>
                {isCollapsed ? (
                    <Tooltip>
				<TooltipTrigger asChild><PopoverTrigger asChild>
					{trigger}
				</PopoverTrigger></TooltipTrigger>
				<TooltipContent side="right">{label}</TooltipContent>
			</Tooltip>
                ): (
                    <PopoverTrigger asChild>
					{trigger}
				</PopoverTrigger>
                )}
                
				
				<PopoverContent side="right" align="start" className="w-48 p-0">
					<div className="flex flex-col gap-0.5">
						<div className="p-3 text-sm font-semibold border-b flex items-center gap-2">{icon && <span className={cn("shrink-0", "[&>svg]:size-4")}>{icon}</span>}{label}</div>
                        <div className="flex flex-col gap-0.5 p-1">
						{children}
                        </div>
					</div>
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<div className={cn("w-full",className)} {...props}>
			{trigger}
			{isOpen && (
				<div className="ml-3 mt-1 flex flex-col gap-0.5 border-l pl-3">
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
				"focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent",
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
export function SidebarTrigger({
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const sidebarId = useSidebarId();
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
			className={cn("", className)}
			onClick={() => sidebarActions.toggleSidebar(sidebarId, isMobile)}
			{...props}
		>
			<PanelLeftIcon className="h-4 w-4" />
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
}