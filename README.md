TODO ...

## The Basics

-   Component theory (Notion-blocks)
-   Styling

Features:

-   Dark/light mode
-   Syntax highlighting
-   Composable pages
-   Stackbit ready

## Setup

-   Importing to Contentful ...

## Adding a section:

1. Add model to contentful
1. Add to page's section
1. Add types to `types/index.ts`
    1. Add ID to `SectionType`
    1. Add type based on `Section` type
    1. Add new type to `ComposableSection`
1. Add component file
    - Use new section type for props
1. Add item to `DynamicComponent`

## Stackbit integration steps:

Install stackbit CLI:

    npm install -g @stackbit/cli

Add dependencies:

    npm install -D @stackbit/cms-contentful @stackbit/types

Add config

```ts
// stackbit.config.ts

import { ContentfulContentSource } from '@stackbit/cms-contentful';
import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'nextjs',
    nodeVersion: '16',
    contentSources: [
        new ContentfulContentSource({
            spaceId: process.env.CONTENTFUL_SPACE_ID!,
            environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
            previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
        })
    ]
    // modelExtensions: [{ name: 'page', type: 'page', urlPath: '/{slug}' }]
});
```

The `modelExtensions` can be added after to discuss sitemap navigation and page editor.

Look out for:

-   Places where you need an ID and field path, but only have one element.
    -   Either combine them using `data-sb-field-path="{id}:{path}"` (this is recommended because you may get a better UI)
    -   Or add an interior element, like a `<span>`.

The rest should just work. 🎉

---

TODO:

-   [ ] Readme instructions

Bug fixes:

-   [ ] Dark mode flicker

##
