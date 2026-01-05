
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { dirname } from 'path';

// Load env vars
// We need to resolve .env path relative to this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Error: DATABASE_URL is not defined in .env file');
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: connectionString,
});

async function main() {
  const client = await pool.connect();
  try {
    console.log('Connected to database...');

    // 1. Apply Schema (Idempotent check inside schema ideally, but schema.sql uses "if not exists")
    console.log('Applying schema... SKIPPED to avoid policy errors');
    // const schemaPath = path.join(__dirname, '../database/schema.sql');
    // const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    // await client.query(schemaSql);
    // console.log('Schema applied.');

    // 2. Seed Products
    console.log('Seeding products...');
    const productImagesDir = path.join(__dirname, '../public/product-images');
    if (fs.existsSync(productImagesDir)) {
      const files = fs.readdirSync(productImagesDir);
      
      for (const file of files) {
        if (!file.endsWith('.png') && !file.endsWith('.jpg')) continue;

        const name = `Whisk Collection - ${file.substring(0, 10)}`;
        const description = 'Exclusive Whisk collection design. Premium quality.';
        const price = 32.99;
        const base_image_url = `/product-images/${file}`;
        const category = 'tshirt';

        // Check if exists
        const check = await client.query('SELECT id FROM products WHERE base_image_url = $1', [base_image_url]);
        if (check.rows.length === 0) {
           await client.query(
             'INSERT INTO products (name, description, price, base_image_url, category) VALUES ($1, $2, $3, $4, $5)',
             [name, description, price, base_image_url, category]
           );
           console.log(`Inserted: ${name}`);
        } else {
           console.log(`Skipped (exists): ${name}`);
        }
      }
    } else {
        console.warn('Directory public/product-images not found!');
    }
    
    console.log('Done!');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.release();
    pool.end();
  }
}

main();
