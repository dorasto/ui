# Content Structure

This directory contains all the blocks/components showcased in the UI library.

## Structure

```
src/content/
├── blocks-metadata.ts       # Central metadata for ALL blocks (single source of truth)
├── blocks-components.tsx    # Auto-generates component mappings from metadata
├── clipboard/               # Example: Clipboard block
│   ├── examples.tsx         # All examples in ONE file (Example01, Example02, etc.)
│   └── docs.mdx             # Documentation for the clipboard block
└── [block-name]/            # Future blocks follow the same pattern
    ├── examples.tsx         # All examples as named exports
    └── docs.mdx             # Optional documentation
```

## Key Features

- ✅ **Single source of truth**: All metadata in `blocks-metadata.ts`
- ✅ **Auto-discovery**: No manual component registration needed
- ✅ **Consolidated examples**: All examples in one file per block
- ✅ **Convention-based**: Follows predictable naming patterns

## Adding a New Block

To add a new block (e.g., "sidebar"), you only need to edit **2-3 files**:

### 1. Add metadata to blocks-metadata.ts

Add your block to the `blocksMetadata` array:

```typescript
// First, add category if needed
export const categoryIds = {
  Clipboard: "clipboard",
  Sidebar: "sidebar", // Add this
} as const;

// Then add block metadata
{
  id: "sidebar",
  category: categoryIds.Sidebar,
  name: "Sidebar",
  description: "A collapsible sidebar component",
  icon: IconSidebar,
  hasDocs: true,
  examples: [
    {
      id: "sidebar-01",
      name: "Basic",
      description: "A basic sidebar example",
    },
    {
      id: "sidebar-02",
      name: "With navigation",
      description: "Sidebar with navigation items",
    },
  ],
  props: [
    {
      name: "open",
      type: "boolean",
      defaultValue: "true",
      description: "Whether the sidebar is open",
    },
    // Add more props...
  ],
}
```

### 2. Create examples file

Create `src/content/sidebar/examples.tsx` with all examples as named exports:

```tsx
"use client";

// Example 01: Basic sidebar
export function Example01() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {/* Your first example */}
    </div>
  );
}

// Example 02: Sidebar with navigation
export function Example02() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {/* Your second example */}
    </div>
  );
}
```

### 3. Add documentation (optional)

Create `src/content/sidebar/docs.mdx`:

```mdx
import { CodeBlock } from "/src/components/ui/code-block.tsx"
import { Label } from "/src/components/ui/label.tsx"

<div className="flex flex-col gap-3 w-full">
<Label className="text-3xl font-bold">Features</Label>
</div>

- ✅ Feature 1
- ✅ Feature 2

<div className="flex flex-col gap-3 w-full">
<Label className="text-3xl font-bold">Usage</Label>
<CodeBlock code={\`<Sidebar />\`} />
</div>
```

**That's it!** The system automatically:
- Discovers your examples from `{blockId}/examples.tsx`
- Maps example IDs to exported functions (Example01, Example02, etc.)
- Loads documentation from `{blockId}/docs.mdx`

## Naming Conventions

- **Block ID**: Use kebab-case (e.g., `clipboard`, `sidebar`)
- **Example ID**: Format as `{blockId}-{number}` (e.g., `clipboard-01`, `sidebar-02`)
- **Example exports**: Use `Example{number}` (e.g., `Example01`, `Example02`)
- **File names**: 
  - Examples: `examples.tsx`
  - Documentation: `docs.mdx`

## How It Works

### Auto-Discovery System

`blocks-components.tsx` uses Vite's `import.meta.glob` to:
1. Load all `*/examples.tsx` files
2. Read `blocks-metadata.ts` for example definitions
3. Automatically map example IDs to exported components

Example: For `clipboard-01`, it loads `clipboard/examples.tsx` and finds `Example01`.

### Code Loading

`code-loader.ts` handles:
- **Examples**: Loads from `/src/content/{blockId}/examples.tsx` and extracts specific example functions
- **Docs**: Loads from `/src/content/{blockId}/docs.mdx`

## Benefits of This Structure

1. **Minimal files**: Only 2-3 files per block
2. **No manual registration**: Auto-discovery handles component mapping
3. **Easy to maintain**: All examples for a block in one place
4. **Single source of truth**: Metadata drives everything
5. **Scalable**: Add new blocks without touching multiple files
