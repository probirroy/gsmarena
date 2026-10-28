# Architecture overview

This project adopts a layered architecture suited for a phone catalog and technology publication:

- `apps/web` renders SEO-friendly pages with Astro and serves static catalog content.
- `apps/api` exposes a Rust/Actix API for developer-facing endpoints and audit-safe business logic.
- `packages/shared-types` defines DTO contracts shared by the frontend and backend.
- PostgreSQL stores authoritative catalog, user, review, and moderation data.
- Redis handles public content caching, rate limiting, and session state.
- Meilisearch provides fast fuzzy search and facets for phones, brands, and editorial content.

This architecture intentionally keeps the authoritative database as the source of truth while search and cache remain derived, rebuildable layers.
