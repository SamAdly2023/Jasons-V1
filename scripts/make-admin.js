
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

const TARGET_EMAIL = 'jasonseo2025@gmail.com';

async function makeAdmin() {
  const client = await pool.connect();
  try {
    console.log('Connected to database...');
    console.log(`Making ${TARGET_EMAIL} an admin...`);
    
    // Update user
    const res = await client.query(
        'UPDATE users SET is_admin = true WHERE email = $1 RETURNING *',
        [TARGET_EMAIL]
    );
    
    if (res.rowCount > 0) {
        console.log(`Success! User ${TARGET_EMAIL} is now an admin.`);
        console.log(res.rows[0]);
    } else {
        console.log(`User with email ${TARGET_EMAIL} not found in database.`);
        console.log('They will become an admin automatically upon their next login due to server configuration updates.');
    }
    
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    client.release();
    pool.end();
  }
}

makeAdmin();
