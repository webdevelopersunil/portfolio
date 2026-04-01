# Sunil Kumar Portfolio — Local Setup Guide

## Requirements

Install these on your machine before starting:

- **Node.js** (v20 or higher) → https://nodejs.org
- **pnpm** (package manager) → run: `npm install -g pnpm`
- **PostgreSQL** (v14 or higher) → https://www.postgresql.org/download/

---

## Step 1 — Install Dependencies

Open a terminal in the project root folder and run:

```bash
pnpm install
```

This installs all packages for the frontend, backend, and shared libraries.

---

## Step 2 — Set Up PostgreSQL Database

Create a database locally:

```bash
psql -U postgres
CREATE DATABASE portfolio_db;
\q
```

---

## Step 3 — Set Environment Variables

Create a `.env` file in the project root with these values:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/portfolio_db
SESSION_SECRET=any-long-random-secret-string-here
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

---

## Step 4 — Push Database Schema

```bash
pnpm --filter @workspace/db run push
```

This creates the required tables in your database.

---

## Step 5 — Run the Backend API

Open a terminal and run:

```bash
PORT=8080 BASE_PATH=/api pnpm --filter @workspace/api-server run dev
```

The API starts at **http://localhost:8080**
On first run it automatically creates:
- Admin user: `admin` / `portfolio@123`
- All portfolio content (seeded from Sunil's resume)

---

## Step 6 — Run the Frontend Portfolio

Open a **second terminal** and run:

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/portfolio run dev
```

The portfolio opens at **http://localhost:3000**

---

## Accessing the Admin Panel

- **Portfolio**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Username**: `admin`
- **Password**: `portfolio@123`

---

## Project Structure

```
portfolio/
├── artifacts/
│   ├── api-server/        ← Express backend (Node.js)
│   └── portfolio/         ← React frontend (Vite)
├── lib/
│   ├── api-spec/          ← OpenAPI spec
│   ├── api-client-react/  ← Generated API hooks
│   ├── api-zod/           ← Generated Zod schemas
│   └── db/                ← Database schema (Drizzle ORM)
├── package.json
└── pnpm-workspace.yaml
```

---

## Changing the Admin Password

To change the admin password, connect to your database and run:

```sql
UPDATE admin_users
SET password_hash = '$2b$10$...'  -- use bcrypt to hash your new password
WHERE username = 'admin';
```

Or simply delete the admin user and restart the server (it will recreate with default password):

```sql
DELETE FROM admin_users WHERE username = 'admin';
```

---

## Regenerating API Types (Advanced)

If you modify the API spec (`lib/api-spec/openapi.yaml`), regenerate the types:

```bash
pnpm --filter @workspace/api-spec run codegen
```
