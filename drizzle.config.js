import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url: 'postgresql://neondb_owner:npg_BVxbog8Yy3dk@ep-round-cell-aey6ebed-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
  }
});
