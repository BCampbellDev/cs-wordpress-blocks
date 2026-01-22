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
