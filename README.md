# Sunil Kumar Portfolio

A full-stack, dynamically driven portfolio application built with modern web technologies. This project is structured as a monorepo that contains the React frontend, Node.js backend API, and shared libraries for database schemas, API specifications, and generated clients.

## 🚀 Technology Stack

### Frontend
- **React 19** – Modern UI library
- **Vite** – Fast frontend tooling and bundler
- **Tailwind CSS v4** – Utility-first CSS framework for styling
- **React Query** – Data fetching and state management
- **Orval** – Generated React hooks from OpenAPI specifications
- **shadcn/ui** – Beautifully designed, accessible UI components

### Backend
- **Node.js & Express** – Fast, unopinionated backend framework
- **PostgreSQL** – Robust relational database
- **Drizzle ORM** – Type-safe database ORM
- **Zod** – TypeScript-first schema declaration and validation

### Architecture & Tools
- **Monorepo** – Managed via **pnpm** Workspaces
- **OpenAPI / Swagger** – Single source of truth for API contracts (`lib/api-spec/openapi.yaml`)
- **TypeScript** – End-to-end type safety

---

## 🛠️ Local Setup Guide

### Requirements

Install these on your machine before starting:
- **Node.js** (v20 or higher) → [Download here](https://nodejs.org)
- **pnpm** (package manager) → Run `npm install -g pnpm`
- **PostgreSQL** (v14 or higher) → [Download here](https://www.postgresql.org/download/)

### Step 1 — Install Dependencies

Open a terminal in the project root folder and run:

```bash
pnpm install
```
*(This installs all packages for the frontend, backend, and shared libraries.)*

### Step 2 — Set Up PostgreSQL Database

Create a database locally:

```bash
psql -U postgres
CREATE DATABASE portfolio_db;
\q
```

### Step 3 — Set Environment Variables

Create a `.env` file in the project root with the following values:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/portfolio_db
SESSION_SECRET=any-long-random-secret-string-here
```
*(Replace `YOUR_PASSWORD` with your PostgreSQL password.)*

### Step 4 — Push Database Schema

Run Drizzle to create the required tables in your database:

```bash
pnpm --filter @workspace/db run push
```

### Step 5 — Run the Backend API

Open a terminal and start the Express server:

```bash
PORT=8080 BASE_PATH=/api pnpm --filter @workspace/api-server run dev
```
The API starts at **http://localhost:8080**  
*(Note: On first run, it automatically creates the admin user `admin` / `portfolio@123` and seeds all portfolio content.)*

### Step 6 — Run the Frontend Portfolio

Open a **second terminal** and run the Vite dev server:

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/portfolio run dev
```
The portfolio will be available at **http://localhost:3000**

---

## 🔐 Accessing the Admin Panel

- **Portfolio**: [http://localhost:3000](http://localhost:3000)
- **Admin Login**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Username**: `admin`
- **Password**: `portfolio@123`

---

## 📂 Project Structure

```text
portfolio/
├── artifacts/
│   ├── api-server/        ← Express backend (Node.js)
│   └── portfolio/         ← React frontend (Vite)
├── lib/
│   ├── api-spec/          ← OpenAPI spec
│   ├── api-client-react/  ← Generated API hooks (Orval)
│   ├── api-zod/           ← Generated Zod schemas
│   └── db/                ← Database schema (Drizzle ORM)
├── package.json
└── pnpm-workspace.yaml
```

---

## 🔧 Advanced Configuration

### Changing the Admin Password
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

### Regenerating API Types
If you modify the API spec (`lib/api-spec/openapi.yaml`), regenerate the Zod types and React Query hooks by running:
```bash
pnpm --filter @workspace/api-spec run codegen
```
