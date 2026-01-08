
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from root .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;

// Check if DATABASE_URL is present
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined in .env file');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function clearGallery() {
  const client = await pool.connect();
  try {
    console.log('Connected to database...');
    console.log('Clearing all designs from gallery...');
    
    // Deleting all records from 'designs' table
    const res = await client.query('DELETE FROM designs');
    
    console.log(`Gallery cleared successfully! Removed ${res.rowCount} designs.`);
  } catch (error) {
    console.error('Error clearing gallery:', error);
  } finally {
    client.release();
    pool.end();
  }
}

clearGallery();
