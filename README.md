# Inventory App

A simple Node.js inventory management app built with Express, EJS, and PostgreSQL.

## What it does

- Shows a list of product categories.
- Opens category detail pages with items assigned to each category.
- Supports adding, editing, and deleting categories.
- Supports adding, editing, and deleting items for a selected category.
- Stores data in PostgreSQL and renders views with EJS templates.

## Features

- Category management
- Item management by category
- Clean card-based layout with modern buttons
- Basic form-based CRUD operations

## Prerequisites

- Node.js
- PostgreSQL
- Optional: `nodemon` for development

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root and set your database connection values:

```bash
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=mydb
DB_PORT=5432
PORT=3000
```

3. Initialize the database schema and seed sample data:

```bash
node db/populatedb.js
```

> The seed script uses `DATABASE_URL` if available. If you prefer, set `DATABASE_URL` instead of individual Postgres variables.

## Run the app

- Start normally:

```bash
npm start
```

- Start in development mode:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Project structure

- `app.js` — Express application entry point
- `routes/usersRouter.js` — app routing
- `controllers/usersController.js` — request handlers
- `db/queries.js` — database queries
- `db/pool.js` — PostgreSQL connection pool
- `db/populatedb.js` — schema and seed script
- `views/` — EJS templates
- `public/styles.css` — app styling

## Notes

- This app uses PostgreSQL tables `categories` and `items`.
- Deleting a category also removes its items.
- Item edits return to the category detail page.

