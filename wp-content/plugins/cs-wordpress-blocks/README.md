# cs-wordpress-blocks

A WordPress plugin used as a **case study playground** for modern WordPress development.

This plugin intentionally contains **multiple isolated features and blocks** that demonstrate
how I work with:

- the Gutenberg block editor
- modern editor UX patterns
- server-side rendering
- performance-conscious PHP
- clean, maintainable structure

Each feature lives in its own folder and is designed to be understandable on its own.

---

## Included case studies

### Dynamic Feed (Gutenberg Block)

**Path:** `dynamic-feed/`

A custom **dynamic Gutenberg block** that renders a feed of posts based on editor-selected criteria.

**Demonstrates:**

- Block creation using `@wordpress/create-block`
- `block.json`-driven registration
- Dynamic rendering via `"render": "file:./render.php"`
- Server-side rendering (SSR) preview in the editor
- InspectorControls + Block toolbar UX
- Taxonomy term selection using WordPress data stores
- Frontend transient caching with cache bypass for REST/admin contexts
- Clean editor code organization (component-based refactor)

See: `dynamic-feed/README.md` for full details.

---

## Plugin structure

```
cs-wordpress-blocks/
├── dynamic-feed/
│   ├── README.md
│   ├── src/
│   ├── build/
│   └── package.json
├── cs-wordpress-blocks.php
└── README.md
```

Each subdirectory under this plugin represents a **self-contained case study** or feature.

---

## Development notes

- This plugin is not intended to be installed as-is in production.
- It exists to demonstrate:
    - decision-making
    - understanding of WordPress internals
    - modern editor development patterns
- Features may intentionally favor clarity over abstraction.

---

## Why a single plugin?

Keeping multiple case studies inside one plugin allows:

- shared local development setup
- consistent tooling
- easy comparison of approaches

Each case study remains isolated so it could be extracted into its own plugin if needed.

---

## Setup (local development)

This plugin is developed in a local WordPress environment (example: Lando).

General workflow for block-based case studies:

```bash
cd wp-content/plugins/cs-wordpress-blocks/<feature>
npm install
npm run build
```

## Notes

This repository focuses on showing how things are built, not on shipping a finished product.
Trade-offs and learnings are documented where relevant.
