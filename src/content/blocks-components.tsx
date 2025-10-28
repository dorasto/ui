/**
 * Auto-discovery system for block examples
 * Dynamically loads examples from {block}/examples.tsx based on blocks-metadata
 */
import { blocksMetadata } from "./blocks-metadata";

// Dynamically import all examples.tsx files from block folders
const examplesModules = import.meta.glob<Record<string, React.ComponentType>>(
	"./*/examples.tsx",
	{ eager: true },
);

/**
 * Automatically generate the component mapping based on blocks metadata
 * Convention: {blockId}/examples.tsx exports Example01, Example02, etc.
 */
function generateBlocksComponents(): Record<string, React.ComponentType> {
	const components: Record<string, React.ComponentType> = {};

	for (const block of blocksMetadata) {
		const modulePath = `./${block.id}/examples.tsx`;
		const module = examplesModules[modulePath];

		if (!module) {
			console.warn(`No examples module found for block: ${block.id}`);
			continue;
		}

		// Map each example from metadata to its corresponding exported component
		for (const example of block.examples) {
			// Extract example number from ID (e.g., "clipboard-01" -> "01")
			const match = example.id.match(/-(\d+)$/);
			if (!match) {
				console.warn(`Invalid example ID format: ${example.id}`);
				continue;
			}

			const exampleNum = match[1];
			const exportName = `Example${exampleNum}`;
			const component = module[exportName];

			if (component) {
				components[example.id] = component;
			} else {
				console.warn(
					`Component ${exportName} not found in ${modulePath} for example ${example.id}`,
				);
			}
		}
	}

	return components;
}

export const blocksComponents = generateBlocksComponents();
