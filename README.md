# Mini Snippet Vault

Mini **full-stack service** for storing useful snippets (links, notes, commands) with tags, search and pagination.

Users can:

* create snippets
* search snippets by title or content
* filter snippets by tags
* open snippet details
* edit or delete snippets

---

# Tech Stack

Frontend

* Next.js (App Router)
* TypeScript
* TailwindCSS

Backend

* NestJS
* MongoDB (Mongoose)
* TypeScript

---

# Project Structure

```
snippet-vault
│
├─ backend     # NestJS API
├─ frontend    # Next.js application
└─ README.md
```

---

# Backend Setup

Start MongoDB locally first.

Then run the backend:

```
cd backend
npm install
npm run dev
```

The backend will run on:

```
http://localhost:3000
```

---

# Seed Demo Data

The project contains demo snippets for easier testing.

When the backend starts, it will automatically **seed demo data if the database is empty**.

If you want to run the seed manually:

```
cd backend
npm run seed
```

If you want to start the server **without seeding**, run:

```
npm run start:dev
```

---

# Frontend Setup (Local)

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3001
```

*(or the port shown by Next.js)*

---

# Frontend via Vercel

The frontend is also deployed on **Vercel**.

You can open the application directly using the Vercel link.

https://LINK.vercel.app

⚠️ Even when using the Vercel frontend, the **backend must still be running locally**.

Make sure the backend is started:

```
cd backend
npm run dev
```

---

# Environment Variables

Backend requires the following environment variables:

```
MONGODB_URI=mongodb://localhost:27017/snippet-vault
PORT=3000
```

Example file:

```
backend/.env.example
```

---

# API Examples

Get all snippets

```
GET /snippets
```

Search snippets

```
GET /snippets?q=react
```

Filter by tag

```
GET /snippets?tag=react
```

Create snippet

```
POST /snippets
```

Update snippet

```
PATCH /snippets/:id
```

Delete snippet

```
DELETE /snippets/:id
```

---

# Notes

* No authentication is implemented (as specified in the task requirements).
* The project focuses on clean CRUD API, search, filtering and pagination.
* Demo seed data is included to make testing easier.
