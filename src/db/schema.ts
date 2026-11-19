import { pgTable, serial, text, timestamp, boolean, integer, jsonb, uniqueIndex } from "drizzle-orm/pg-core";

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").default("").notNull(),
    body: text("body").default("").notNull(), // Markdown for native posts, HTML for Medium
    cover: text("cover").default("").notNull(),
    category: text("category").default("Brand Architecture").notNull(),
    tags: jsonb("tags").$type<string[]>().default([]).notNull(),
    source: text("source").default("native").notNull(), // native | medium
    canonicalUrl: text("canonical_url").default("").notNull(),
    status: text("status").default("draft").notNull(), // draft | scheduled | published
    publishAt: timestamp("publish_at", { withTimezone: true }).defaultNow().notNull(),
    readMinutes: integer("read_minutes").default(3).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("posts_slug_idx").on(t.slug)],
);

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  client: text("client").default("").notNull(),
  discipline: text("discipline").default("Brand").notNull(), // Brand | M&E
  year: text("year").default("").notNull(),
  summary: text("summary").default("").notNull(),
  result: text("result").default("").notNull(),
  image: text("image").default("").notNull(),
  order: integer("order").default(0).notNull(),
  published: boolean("published").default(true).notNull(),
});

export const mediaAssets = pgTable("media_assets", {
  id: serial("id").primaryKey(),
  slot: text("slot").notNull(), // e.g. hero, portrait, about, speaking
  label: text("label").notNull(),
  url: text("url").notNull(),
  alt: text("alt").default("").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  intent: text("intent").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organisation: text("organisation").default("").notNull(),
  message: text("message").notNull(),
  status: text("status").default("new").notNull(), // new | replied | archived
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
