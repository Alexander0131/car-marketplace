import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const DBURL = import.meta.env.VITE_DRIZZLE_DATABASE_URL;
const sql = neon(DBURL);
export const db = drizzle(sql, {schema});