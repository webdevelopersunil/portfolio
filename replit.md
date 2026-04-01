# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Auth**: JWT (jsonwebtoken + bcryptjs)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── portfolio/          # React + Vite portfolio website
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Portfolio Website

### URLs
- **Portfolio**: `/` — Public portfolio website
- **Admin Login**: `/admin/login` — Protected admin login page
- **Admin Dashboard**: `/admin` — Content management settings page

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `portfolio@123`

> Change the password by updating the database directly after first login.

### Features
- Portfolio sections: Hero, Experience, Projects, Skills, Education, Achievements
- All content is stored in the database and editable from the admin panel
- JWT-based authentication — token stored in localStorage
- Admin dashboard with tabbed section editor for all portfolio content

## Database Schema

### `admin_users`
- id, username (unique), password_hash, created_at

### `portfolio_sections`
- section (PK — "hero", "experience", "projects", "skills", "education", "achievements")
- content (JSONB)
- updated_at

## API Endpoints

### Auth
- `POST /api/auth/login` — Login, returns JWT token
- `POST /api/auth/logout` — Logout (client-side token removal)
- `GET /api/auth/me` — Check auth status

### Content (Public)
- `GET /api/content` — Get all portfolio content

### Content (Protected — requires Bearer token)
- `PUT /api/content/hero` — Update hero section
- `PUT /api/content/experience` — Update experience section
- `PUT /api/content/projects` — Update projects section
- `PUT /api/content/skills` — Update skills section
- `PUT /api/content/education` — Update education section
- `PUT /api/content/achievements` — Update achievements section

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks from OpenAPI spec
