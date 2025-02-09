CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing products table if it exists
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  category_id VARCHAR(255) NOT NULL
);
