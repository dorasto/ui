# Preview Component

A hover card component that displays rich URL previews with OpenGraph metadata.

## Files

- `preview.tsx` - Main client component with composable parts
- `preview-server.ts` - Server utility for fetching metadata

## Usage in your project

This component follows the block structure defined in `/src/content/README.md`.

### Examples Location
All examples are in `/src/content/preview/examples.tsx` as named exports:
- `Example01` - Basic usage
- `Example02` - Server-side metadata fetching  
- `Example03` - Custom styling variations

### Metadata Location
Block metadata is in `/src/content/blocks-metadata.ts`

### Documentation
Full documentation is in `/src/content/preview/docs.mdx`

## Quick Start

```tsx
import {
  Preview,
  PreviewContent,
  PreviewDescription,
  PreviewImage,
  PreviewLink,
  PreviewTitle,
  PreviewTrigger,
} from "@@/registry/preview/preview"

<Preview>
  <PreviewTrigger asChild>
    <a href="https://github.com">GitHub</a>
  </PreviewTrigger>
  <PreviewContent className="w-80">
    <PreviewImage src="..." alt="..." />
    <div className="space-y-2 mt-3">
      <PreviewTitle>Title</PreviewTitle>
      <PreviewDescription>Description</PreviewDescription>
      <PreviewLink href="https://github.com">github.com</PreviewLink>
    </div>
  </PreviewContent>
</Preview>
```

## Server-Side Fetching

```tsx
import { fetchPreview } from "@@/registry/preview/preview-server"

const metadata = await fetchPreview("https://github.com")
// Returns: { title, description, image, url }
```
