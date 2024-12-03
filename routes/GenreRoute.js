const express = require("express");
const router = express.Router();
const {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
  index,
  getCreateGenre,
} = require("../controllers/GenreController");
router.get("/", index);
router.get("/create", getCreateGenre);
router.get("/update/:id", getCreateGenre);
router.post("/create", createGenre);
router.post("/update/:id", updateGenre);
router.post("/delete/:id", deleteGenre);

module.exports = router;
