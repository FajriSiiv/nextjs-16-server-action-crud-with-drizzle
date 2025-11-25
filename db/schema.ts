import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const fruits = sqliteTable("fruits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const employees = sqliteTable("employees", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  position: text("position").notNull(),
});

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  slug_product: text("slug_product").notNull(),
  price: integer("price").notNull(),
  createdAt: text("created_at").default(new Date().toISOString()),
  category: text("category").notNull(),
});
