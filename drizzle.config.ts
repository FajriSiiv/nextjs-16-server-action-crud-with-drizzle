import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./db/schema.ts",
  // driver: "pg",
  dialect: "postgresql",
  // dbCredentials: {
  //   url: "./local.db",
  // },
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL!,
  },
});
