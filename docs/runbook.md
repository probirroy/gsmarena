# Operations runbook

## Local startup

```bash
npm install
npm run dev
```

Optional infrastructure:

```bash
docker compose up -d postgres redis meilisearch
```

## Build validation

```bash
npm run build
```

## Common checks

- Confirm the homepage renders with data.
- Confirm brand and phone pages resolve.
- Verify filter and comparison links are functional.
- Monitor API health endpoints and queue jobs.

## Failure response

- Database outages: retry writes, fail closed on auth-sensitive flows.
- Cache outages: serve stale public content with a warning when appropriate.
- Search index lag: continue serving from PostgreSQL while indexing catches up.
- Deployment issues: roll back to the previous image and restore the latest database snapshot.
