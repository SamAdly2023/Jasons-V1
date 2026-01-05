# Database Setup with Supabase

This project is configured to use Supabase (PostgreSQL) for storing products, users, and orders.

## 1. Create a Supabase Project
1. Go to [https://supabase.com/](https://supabase.com/) and sign up/log in.
2. Create a new project.
3. Once the project is ready, go to **Project Settings** -> **API**.
4. Copy the `Project URL` and `anon` public key.

## 2. Configure Environment Variables
1. Create a `.env` file in the root of your project (if not exists).
2. Add the following variables:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 3. Create Database Tables
1. In your Supabase dashboard, go to the **SQL Editor**.
2. Click **New Query**.
3. Copy the contents of `database/schema.sql` from this project.
4. Paste it into the SQL Editor and click **Run**.

This will create the necessary tables: `users`, `products`, `designs`, `orders`, and `order_items`.

## 4. Seed Data (Optional)
You can manually insert your initial products into the `products` table using the Table Editor in Supabase, or write a script to upload them from `constants.tsx`.
