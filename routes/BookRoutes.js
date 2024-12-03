const express = require("express");
const router = express.Router();
const {
  getBookByGenreId,
  getBookByAuthorId,
  getBookByPublisherId,
  getBookById,
  deleteBook,
  getCreatepage,
  createBook,
  updateBook,
    index,
} = require("../controllers/BookController");
router.get("/", index);
router.get("/create", getCreatepage);
router.get("/update/:id", getCreatepage);
router.post("/create", createBook);
router.post("/delete/:id", deleteBook);
router.post("/update/:id", updateBook);

module.exports = router;
