# Quick Start: Adding a New Block

This is the **TL;DR** version. See [README.md](./README.md) for full documentation.

## 3-Step Process

### 1. Add to `blocks-metadata.ts`

```typescript
{
  id: "my-component",
  category: categoryIds.MyCategory,
  name: "My Component",
  description: "What it does",
  icon: IconComponent,
  hasDocs: true,
  examples: [
    { id: "my-component-01", name: "Basic", description: "Basic usage" },
    { id: "my-component-02", name: "Advanced", description: "Advanced usage" },
  ],
  props: [
    { name: "prop1", type: "string", description: "Does X", required: true },
  ],
}
```

### 2. Create `my-component/examples.tsx`

```tsx
"use client";

export function Example01() {
  return <div>Basic example</div>;
}

export function Example02() {
  return <div>Advanced example</div>;
}
```

### 3. (Optional) Create `my-component/docs.mdx`

```mdx
## Features
- Feature 1
- Feature 2
```

## That's It!

The system **automatically**:
- Maps example IDs to components
- Loads and displays examples
- Shows documentation
- Generates code snippets

## File Structure

```
src/content/
├── blocks-metadata.ts          ← Edit this
├── blocks-components.tsx       ← Auto-generated (don't edit)
└── my-component/
    ├── examples.tsx            ← Create this
    └── docs.mdx                ← Optional
```
