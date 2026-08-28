# Deployment & database notes

## Applying the schema changes

The August 2026 update adds three things to the database:

| Change | Table | Notes |
| --- | --- | --- |
| `Department` model | new table | department pages + their staff tables, editable from the admin panel |
| `content`, `attachments` | `News` | full message body and PDF/JPG attachments |
| `description`, `eventDate`, `attachments` | `Event` | longer text, a real calendar date for sorting, attachments |

All of it is additive — no column is dropped or renamed, and every new column
has a default, so existing rows keep working untouched.

Apply it with:

```bash
npx prisma db push
```

Then import the existing department pages into the new table (one time only):

```bash
npm run db:seed:departments
```

The seed **skips departments that already exist**, so it is safe to re-run and
will never overwrite something an admin has edited. Pass `--force` only if you
deliberately want to reset every department page back to the bundled copy:

```bash
npx tsx prisma/seed-departments.ts --force
```

Until the seed is run, the department pages fall back to the copy bundled in
`frontend/src/lib/department-content.ts`, so the site keeps working — but the
admin panel will show an empty Departments list, because there is nothing in the
database to edit yet.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection (pooled) |
| `DIRECT_URL` | Postgres connection (direct — used for migrations) |
| `JWT_SECRET` | Signs admin and student sessions |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | File and image uploads |
| `API_PORT` *(dev only, optional)* | Port for the local API server, default `3001` |
| `VITE_PORT` *(dev only, optional)* | Port for the local Vite server, default `8080` |

## Where the API lives

There is **one** implementation of every API route: `api/_handler.ts`.

- `server.ts` — local dev adapter (Express)
- `api/[...path].ts` — deployed Vercel function adapter

Both are thin: they translate their framework's request into `ApiContext`, call
`handleApiRequest`, and write the result back. Add or change routes only in
`api/_handler.ts`. The two entry points previously carried separate copies of
all ~70 routes and drifted apart, which is why fixes could work locally and 404
in production.

## Local development

```bash
npm install
npx prisma generate
npm run dev
```

`npm run dev` starts the API on `http://localhost:3001` and the site on
`http://localhost:8080`. To run against a different port pair (for example when
another server already holds 3001):

```bash
API_PORT=3002 VITE_PORT=8081 npm run dev
```
