const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY category_id ASC");
  return rows;
}

async function getAllCategoryItems(category_id) {
  const { rows } = await pool.query(`SELECT * FROM items WHERE category_id = $1 ORDER BY item_id ASC`, [category_id]);
  return rows;
}

async function insertCategory(category) {
  await pool.query("INSERT INTO categories (category_name) VALUES ($1)", [category.category_name]);
}

async function insertItem(item) {
  await pool.query("INSERT INTO items (item_name, price, category_id) VALUES ($1, $2, $3)", [item.item_name, item.price, item.category_id]);
}

async function searchItem(query){
  let item = query.item;

  const { rows } = await pool.query(`SELECT * FROM items WHERE item LIKE $1`, [`%${item}%`]);
  return rows;
}

async function deleteCategoryById(id) {
  // First delete all items in this category
  await pool.query(`DELETE FROM items WHERE category_id = $1`, [id]);
  // Then delete the category
  await pool.query(`DELETE FROM categories WHERE category_id = $1`, [id]);
  console.log("category and its items deleted");
}

async function deleteItemById(id) {

  await pool.query(`DELETE FROM items WHERE item_id = $1`, [id]);
  console.log("item message deleted");
}

async function updateCategory(category_id, category_name) {
  await pool.query("UPDATE categories SET category_name = $1 WHERE category_id = $2", [category_name, category_id]);
}

async function updateItem(item_id, item_name, price) {
  await pool.query("UPDATE items SET item_name = $1, price = $2 WHERE item_id = $3", [item_name, price, item_id]);
}

async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE category_id = $1", [id]);
  return rows[0];
}

async function getItemById(id) {
  const { rows } = await pool.query("SELECT * FROM items WHERE item_id = $1", [id]);
  return rows[0];
}

module.exports = {
  getAllCategories,
  getAllCategoryItems,
  insertCategory,
  insertItem,
  searchItem,
  deleteItemById,
  deleteCategoryById,
  updateCategory,
  updateItem,
  getCategoryById,
  getItemById
};