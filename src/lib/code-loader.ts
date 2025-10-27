/**
 * Code loader utility for dynamically loading example source code
 * Uses Vite's import.meta.glob to load raw source files
 */

// Load all example component files as raw strings
const modules = import.meta.glob("/src/content/components/*.tsx", {
	query: "?raw",
	import: "default",
});

// Load all MDX documentation files
export const mdxModules = import.meta.glob("/src/content/docs/**/*.mdx", {
	import: "default",
});

/**
 * Get the raw source code for an example by its ID
 * @param exampleId - The ID of the example (e.g., "clipboard-01")
 * @returns Promise that resolves to the raw source code string
 */
export async function getExampleCode(
	exampleId: string,
): Promise<string | null> {
	const path = `/src/content/components/${exampleId}.tsx`;
	const loader = modules[path];

	if (!loader) {
		console.warn(`No code found for example: ${exampleId}`);
		return null;
	}

	try {
		const code = await loader();
		return code as string;
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
	const path = `/src/content/docs/${blockId}.mdx`;
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
