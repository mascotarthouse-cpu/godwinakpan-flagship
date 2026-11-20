import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || process.env.NETLIFY_DB_URL || "";

function connect() {
  if (!url) return null;
  // Netlify DB / Neon: HTTP driver (fast on serverless). Any other Postgres: regular driver.
  if (/neon\.tech|neon\.build/.test(url)) return drizzleNeon(neon(url), { schema });
  return drizzlePg(postgres(url, { max: 3, prepare: false }), { schema }) as unknown as ReturnType<typeof drizzleNeon<typeof schema>>;
}

/** null when no database is configured: the site then runs on built-in content. */
export const db = connect();
export { schema };
