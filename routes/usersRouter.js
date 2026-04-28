const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");

usersRouter.get("/", usersController.getCategories);

usersRouter.get("/new", usersController.createCategoryGet);
usersRouter.post("/new", usersController.createCategoryPost);

usersRouter.get("/new-item", usersController.createItemGet);
usersRouter.post("/new-item", usersController.createItemPost);

usersRouter.get("/read", usersController.getCategoryItems);

usersRouter.get("/search", usersController.searchItem);
usersRouter.post("/delete", usersController.deleteCategory);
usersRouter.post("/delete-item", usersController.deleteItem);

usersRouter.get("/edit-category", usersController.updateCategoryGet);
usersRouter.post("/edit-category", usersController.updateCategoryPost);

usersRouter.get("/edit-item", usersController.updateItemGet);
usersRouter.post("/edit-item", usersController.updateItemPost);

module.exports = usersRouter;