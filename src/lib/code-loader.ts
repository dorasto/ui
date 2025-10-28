/**
 * Code loader utility for dynamically loading example source code
 * Uses Vite's import.meta.glob to load raw source files
 */

// Load consolidated examples.tsx files as raw strings
const modules = import.meta.glob("/src/content/*/examples.tsx", {
	query: "?raw",
	import: "default",
});

// Load all MDX documentation files from block folders
export const mdxModules = import.meta.glob("/src/content/*/docs.mdx", {
	import: "default",
});

/**
 * Extract a specific example function from the consolidated examples.tsx file
 * @param exampleId - The ID of the example (e.g., "clipboard-01")
 * @returns Promise that resolves to the raw source code string of that specific example
 */
export async function getExampleCode(
	exampleId: string,
): Promise<string | null> {
	// Extract block name and example number from ID (e.g., "clipboard-01" -> "clipboard", "01")
	const match = exampleId.match(/^(.+)-(\d+)$/);
	if (!match) {
		console.warn(`Invalid example ID format: ${exampleId}`);
		return null;
	}

	const [, blockName, exampleNum] = match;
	const path = `/src/content/${blockName}/examples.tsx`;
	const loader = modules[path];

	if (!loader) {
		console.warn(
			`No examples file found for block: ${blockName} at path: ${path}`,
		);
		return null;
	}

	try {
		const fullCode = (await loader()) as string;

		// Extract the specific example function from the file
		const functionName = `Example${exampleNum}`;
		const regex = new RegExp(
			`export function ${functionName}\\(\\)[^{]*\\{[\\s\\S]*?^\\}`,
			"m",
		);

		const match = fullCode.match(regex);
		if (match) {
			return match[0];
		}

		// If regex fails, return the whole file (fallback)
		console.warn(
			`Could not extract ${functionName} from ${path}, returning full file`,
		);
		return fullCode;
	} catch (error) {
		console.error(`Error loading code for ${exampleId}:`, error);
		return null;
	}
}

/**
 * Get the MDX documentation component for a block
 * @param blockId - The ID of the block (e.g., "clipboard")
 * @returns Promise that resolves to the MDX component or null
 */
export async function getBlockDocs(
	blockId: string,
): Promise<React.ComponentType | null> {
	const path = `/src/content/${blockId}/docs.mdx`;
	const loader = mdxModules[path];

	if (!loader) {
		return null;
	}

	try {
		const component = await loader();
		return component as React.ComponentType;
	} catch (error) {
		console.error(`Error loading docs for ${blockId}:`, error);
		return null;
	}
}
