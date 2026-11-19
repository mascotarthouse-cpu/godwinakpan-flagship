// Copies the built-in content into Postgres. Run once after `npm run db:push`.
import { db, schema } from "../src/db";
import { posts, projects } from "../src/lib/seed";

if (!db) throw new Error("Set DATABASE_URL first.");

(async () => {
  for (const p of posts) {
    await db.insert(schema.posts).values({ ...p, publishAt: new Date(p.publishAt) }).onConflictDoNothing();
  }
  const existing = await db.select().from(schema.projects);
  if (!existing.length) {
    await db.insert(schema.projects).values(projects.map((p, i) => ({ ...p, order: i })));
  }
  console.log("Seeded.");
  process.exit(0);
})();
