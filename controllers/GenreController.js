const Genre = require("../models/Genre");
const Book = require("../models/Book");

function getAllGenres(req, res) {
  Genre.findAll().then((genres) => {
    res.json(genres);
  });
}
function getGenreById(req, res) {
  const { id } = req.params;
  Genre.findByPk(id).then((genre) => {
    res.json(genre);
  });
}

async function index(req, res) {
  let genres = await Genre.findAll();
  genres = genres.map((genre) => genre.dataValues);

  const genresWithBookCount = await Promise.all(
    genres.map(async (genre) => {
      const bookCount = await Book.count({ where: { genreId: genre.id } });
      return {
        ...genre,
        bookCount: bookCount,
      };
    })
  );
  console.log(genresWithBookCount);
  res.render("genre/index", {
    genres : genresWithBookCount,
  });
}

async function getCreateGenre(req, res) {
  const { id } = req.params;
  if(!id) {
    return res.render("Genre/createGenre");
  }

  // Encuentra el género por su ID
  let genre = await Genre.findByPk(id);
  if (!genre) {
    return res.redirect("/genre/create");
  }

  genre = genre.dataValues;
  res.render("Genre/createGenre", {
    id,
    genre,
  });
}

function createGenre(req, res) {
  const { name, description } = req.body;
  Genre.create({ name, description }).then((genre) => {
    res.redirect("/genre");
  });
}
function updateGenre(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  Genre.update({ name, description }, { where: { id } }).then(() => {
   res.redirect("/genre");
  });
}
function deleteGenre(req, res) {
  const { id } = req.params;
  Genre.destroy({ where: { id } }).then(() => {
    Book.destroy({ where: { genreId: id } }).then(() => {
      res.redirect("/genre");
    });
    
  });
}
module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
  getCreateGenre,
  index,
};
