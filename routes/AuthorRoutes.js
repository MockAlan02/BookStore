const express = require('express');
const router = express.Router();
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  index,
  getCreateAuthor,
} = require('../controllers/AuthorController');

router.get('/', index);
router.get('/create', getCreateAuthor);
router.post('/create', createAuthor);
router.get("/update/:id", getCreateAuthor);
router.post("/update/:id", updateAuthor);
router.post("/delete/:id", deleteAuthor);
module.exports = router;