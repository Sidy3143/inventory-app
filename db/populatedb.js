const { Client } = require("pg");
require("dotenv").config();

const SQL = `
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;

CREATE TABLE IF NOT EXISTS categories (
  category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_name VARCHAR (255)
);

INSERT INTO categories (category_name) 
VALUES
  ('fruits'),
  ('vegetables');

CREATE TABLE IF NOT EXISTS items (
  item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item_name VARCHAR (255),
  price DECIMAL(10, 2),
  category_id INTEGER,
  FOREIGN KEY(category_id) REFERENCES categories(category_id)
);

INSERT INTO items (item_name, price, category_id)
VALUES ('orange', 2.9, 1), ('potato', 5.0, 2), ('apple', 3.5, 1), ('carrot', 4.0, 2), ('banana', 1.5, 1), ('broccoli', 6.0, 2);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();