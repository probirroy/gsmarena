# GSM Arena-inspired mobile discovery platform

This project is a production-oriented mobile phone catalog and comparison platform inspired by the functionality and information architecture of GSMArena, without copying proprietary branding or source code.

## Repository structure

- `apps/web`: Astro front-end
- `apps/api`: Actix Web API skeleton
- `packages/shared-types`: shared TypeScript DTOs
- `docker-compose.yml`: local infrastructure stack
- `docs/`: architecture, runbook, and roadmap

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Admin and API

The admin UI is at http://localhost:4321/admin. It is connected to the Actix API and PostgreSQL; it does not use a client-side default password or localStorage for admin accounts.

1. Copy `.env.example` to `.env` and set a unique `ADMIN_PASSWORD` (at least 12 characters).
2. Install Docker Desktop and start the database and API:

   ```bash
   docker compose up --build -d postgres api
   ```

3. Start the frontend in another terminal:

   ```bash
   npm run dev
   ```

The API applies versioned migrations on startup and creates the first administrator only when the database has no admin users. Its login is configured using `ADMIN_ID` and `ADMIN_PASSWORD` at first startup. Change/remove those environment values after provisioning; adding later admins is handled inside the authenticated dashboard.

Admin sessions use server-side, expiring records and HttpOnly SameSite cookies. Passwords are stored as Argon2 hashes. Phone and article CRUD, site branding, and account creation are persisted in PostgreSQL.

## Production build

```bash
npm run build
```

## Stack summary

- Astro + TypeScript + CSS
- Actix Web + Rust API skeleton
- PostgreSQL schema templates and migrations
- Redis/Valkey + Meilisearch configuration
- Docker Compose for local orchestration

The current frontend catalog includes clearly local sample content; the API-backed admin data is persisted independently. Search indexing, user accounts, reviews, production editorial workflows, and full synchronization of all public pages remain follow-on implementation work and are not represented as complete.

See `docs/architecture.md` and `docs/runbook.md` for operational details.
