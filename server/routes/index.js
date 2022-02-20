const router = require("express").Router();

const {
  getAllItems,
  getItemById,
  postItem,
  serverErrors,
  notFoundError,
} = require("../controllers");

router.get("/items/all/:page", getAllItems);

router.get("/items/:id", getItemById);

router.post("/items", postItem);
router.use(notFoundError);

module.exports = router;
