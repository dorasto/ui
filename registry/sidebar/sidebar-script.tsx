/**
 * Sidebar initialization script
 * 
 * This script MUST be added to your document <head> BEFORE React loads
 * to prevent flash of incorrect sidebar width on page load.
 * 
 * Similar to how dark mode detection works - it reads localStorage
 * synchronously and sets CSS variables that the sidebar component uses.
 * 
 * Add this to your root layout or HTML template:
 * 
 * ```tsx
 * <head>
 *   <SidebarScript />
 *   {/* other head elements *\/}
 * </head>
 * ```
 */

import * as React from "react";
import { sidebarActions, sidebarStore } from "./sidebar-store";

export function SidebarScript() {
	// This script runs BEFORE React hydration
	const script = `
		(function() {
			try {
				var stored = localStorage.getItem('sidebar-state');
				if (stored) {
					var state = JSON.parse(stored);
					// Set CSS variables for each sidebar
					Object.keys(state.sidebars || {}).forEach(function(id) {
						var sidebar = state.sidebars[id];
						var width = sidebar.open ? '16rem' : '3.5rem';
						document.documentElement.style.setProperty('--sidebar-' + id + '-width', width);
					});
				}
			} catch (e) {
				// Fail silently
			}
		})();
	`;

	return (
		<script
			dangerouslySetInnerHTML={{ __html: script }}
			// Blocking script - runs immediately
		/>
	);
}

/**
 * Sidebar Keyboard Shortcuts Handler
 * 
 * Add this component near the root of your app to enable keyboard shortcuts
 * for toggling sidebars. It listens for keyboard events and toggles the
 * appropriate sidebar based on registered shortcuts.
 * 
 * Usage:
 * ```tsx
 * <SidebarKeyboardHandler />
 * ```
 */
export function SidebarKeyboardHandler() {
	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Check if Cmd (Mac) or Ctrl (Windows/Linux) is pressed
			if (!(event.metaKey || event.ctrlKey)) {
				return;
			}

			// Get the key pressed (lowercase)
			const key = event.key.toLowerCase();

			// Check if this key matches any registered shortcut
			// We use the format "mod+key" where mod is cmd/ctrl
			const shortcut = `mod+${key}`;
			
			// Check if this shortcut is registered
			const sidebarId = sidebarStore.state.keyboardShortcuts[shortcut];
			if (sidebarId) {
				// Prevent default browser behavior (e.g., Cmd+B opening bookmarks)
				event.preventDefault();
				// Toggle the sidebar
				sidebarActions.toggleSidebar(sidebarId);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return null;
}
