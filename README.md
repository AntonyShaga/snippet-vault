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

Make sure MongoDB is running locally or provide a MongoDB Atlas connection string.

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

# Live Demo

Frontend:

https://snippet-vault-bice.vercel.app/

Backend API:

https://snippet-vault-3mh3.vercel.app/

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

# API Endpoints

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

Authentication is intentionally not implemented (not required in the assignment).

The project focuses on clean CRUD architecture and full-stack integration.

MongoDB Atlas is used as the production database.
