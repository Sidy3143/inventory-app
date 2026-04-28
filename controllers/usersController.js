const db = require("../db/queries");

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  console.log("Categories: ", categories);

  res.render('index', { categories: categories });
}

async function getCategoryItems(req, res) {
  const category_id = req.query.id;
  const items = await db.getAllCategoryItems(category_id);

  console.log("Items: ", items);

  res.render('index', { items: items });
}

async function createCategoryGet(req, res) {
  res.render('form', { type: 'category' });
}

async function createCategoryPost(req, res) {
  const { category_name } = req.body;
  await db.insertCategory({ category_name: category_name });

  res.redirect("/");
}

async function createItemGet(req, res) {
  const category_id = req.query.category_id;
  res.render('form', { category_id, type: 'item' });
}

async function createItemPost(req, res) {
  const { item_name, price, category_id } = req.body;
  await db.insertItem({ item_name, price, category_id });

  res.redirect(`/read?id=${category_id}`);
}

async function searchItem(req, res) {
  const item = await db.searchItem(req.query) ;

  res.render('index', { item });
}

async function deleteCategory(req, res) {
  const { id } = req.body;

  await db.deleteCategoryById(id) ;

  res.redirect("/");
}

async function deleteItem(req, res) {
  const { id, category_id } = req.body;

  await db.deleteItemById(id);

  if (category_id) {
    return res.redirect(`/read?id=${category_id}`);
  }

  res.redirect("/");
}

async function updateCategoryGet(req, res) {
  const category_id = req.query.id;
  const category = await db.getCategoryById(category_id);
  res.render('form', { type: 'edit-category', category });
}

async function updateCategoryPost(req, res) {
  const { category_id, category_name } = req.body;
  await db.updateCategory(category_id, category_name);
  res.redirect("/");
}

async function updateItemGet(req, res) {
  const item_id = req.query.id;
  const item = await db.getItemById(item_id);
  res.render('form', { type: 'edit-item', item });
}

async function updateItemPost(req, res) {
  const { item_id, item_name, price } = req.body;
  const item = await db.getItemById(item_id); // to get category_id
  await db.updateItem(item_id, item_name, price);
  res.redirect(`/read?id=${item.category_id}`);
}

module.exports = {
  getCategories,
  createCategoryGet,
  createCategoryPost,
  getCategoryItems,
  searchItem,
  createItemGet,
  createItemPost,
  deleteCategory,
  deleteItem,
  updateCategoryGet,
  updateCategoryPost,
  updateItemGet,
  updateItemPost
};