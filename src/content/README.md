# Content Structure

This directory contains all the blocks/components showcased in the UI library.

## Structure

```
src/content/
├── blocks-metadata.ts       # Central metadata for ALL blocks
├── blocks-components.tsx    # Central component registry mapping IDs to components
├── clipboard/               # Example: Clipboard block
│   ├── examples/
│   │   ├── example-01.tsx   # First example variant
│   │   ├── example-02.tsx   # Second example variant
│   │   └── example-03.tsx   # Third example variant
│   └── docs.mdx             # Documentation for the clipboard block
└── [block-name]/            # Future blocks follow the same pattern
    ├── examples/
    │   └── example-01.tsx
    └── docs.mdx
```

## Adding a New Block

To add a new block (e.g., "sidebar"):

### 1. Create the block folder structure

```bash
mkdir -p src/content/sidebar/examples
```

### 2. Add example components

Create `src/content/sidebar/examples/example-01.tsx`:

```tsx
"use client";

export default function SidebarExample01() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {/* Your example component */}
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

### 4. Register in blocks-metadata.ts

Add your block metadata to the `blocksMetadata` array:

```typescript
{
  id: "sidebar",
  category: categoryIds.Sidebar, // Add to categoryIds first
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
  ],
  props: [
    // Add prop definitions here
  ],
}
```

### 5. Register in blocks-components.tsx

Import and register your examples:

```typescript
import SidebarExample01 from "./sidebar/examples/example-01";

export const blocksComponents: Record<string, React.ComponentType> = {
  "clipboard-01": ClipboardExample01,
  "sidebar-01": SidebarExample01, // Add this
};
```

## Naming Conventions

- **Block ID**: Use kebab-case (e.g., `clipboard`, `sidebar`)
- **Example ID**: Use `{blockId}-{number}` (e.g., `clipboard-01`, `sidebar-02`)
- **Example files**: Use `example-{number}.tsx` (e.g., `example-01.tsx`)
- **Component names**: Use PascalCase with block name (e.g., `ClipboardExample01`)

## File Loading

The system automatically loads:
- **Examples**: From `/src/content/{blockId}/examples/example-{number}.tsx`
- **Docs**: From `/src/content/{blockId}/docs.mdx`

This is handled by `/src/lib/code-loader.ts`.
