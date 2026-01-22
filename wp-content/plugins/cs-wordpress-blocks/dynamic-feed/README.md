# cs-wordpress-blocks — Dynamic Feed Gutenberg Block (Case Study)

A modern WordPress/Gutenberg case study demonstrating a **dynamic block** with a polished editor experience and server-rendered output.

## What this shows

- Gutenberg block development using **@wordpress/create-block**
- **Dynamic (PHP-rendered) block** using `block.json` `"render": "file:./render.php"`
- **Editor SSR preview** using `@wordpress/server-side-render`
- Rich editor UI:
  - **InspectorControls** panels for configuration
  - **Block toolbar** toggles (List vs Cards) + actions dropdown
  - Taxonomy **term picker** (multi-select) writing selected term IDs into attributes
- Performance-minded backend:
  - Transient caching on **frontend**
  - SSR/admin rendering kept **fresh** (cache disabled for REST/admin contexts)
- Clean code organization:
  - editor code refactored into small, readable components

## Features

### Editor

- Choose:
  - Post type
  - Taxonomy (Category/Tag)
  - Terms (multi-select)
  - Sorting + limit
  - Display options (image/excerpt/meta)
- Toolbar:
  - List / Cards view toggle
  - Actions dropdown (Reset defaults, Refresh preview)

### Frontend

- Renders a feed of posts matching selected taxonomy terms
- Supports list/cards layout via CSS modifier classes:
  - `.cs-dynamic-feed--list`
  - `.cs-dynamic-feed--cards`

## Project structure (key files)

- `src/block.json` — block metadata + attributes + asset wiring
- `src/edit.js` — editor entry point (orchestration)
- `src/components/*` — Inspector panels, toolbar, preview
- `src/render.php` — server-side renderer (echo-based capture for file render)
- `src/style.scss` — shared styles (frontend + editor SSR output)

## Development setup

### Requirements

- Node / npm
- WP CLI (optional but helpful)
- Local WP environment (example uses Lando)
