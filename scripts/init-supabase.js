
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Error: DATABASE_URL is not defined in .env file');
  process.exit(1);
}

const client = new pg.Client({
  connectionString: connectionString,
});

async function setupDatabase() {
  try {
    await client.connect();
    console.log('Connected to Supabase PostgreSQL database!');

    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Running schema.sql...');
    await client.query(schemaSql);
    
    console.log('Database setup completed successfully!');
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    await client.end();
  }
}

setupDatabase();
