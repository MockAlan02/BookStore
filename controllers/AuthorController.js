const Author = require("../models/Author");
const Book = require("../models/Book");
const { getBookByAuthorId } = require("./BookController");

function getAllAuthors(req, res) {
  Author.findAll().then((authors) => {
    const authorCount = authors.foreach((author) => {
      getBookByAuthorId(author.id).then((books) => {
        author.dataValues.bookCount = books.length;
      });
    });
    res.render("authors", { authors, authorCount });
  });
}

function getAuthorById(req, res) {
  const { id } = req.params;
  Author.findByPk(id).then((author) => {
    res.json(author);
  });
}
async function getCreateAuthor(req, res) {
  let { id } = req.params;
  let author = await Author.findByPk(id);
  if (author) {
    author = author.dataValues;
    console.log(author);
  } else {
    id = false;
  }
  res.render("Author/createAuthor", {
    id,
    author,
  });
}
async function index(req, res) {
  let authors = await Author.findAll();
  console.log(authors);
  authors = await Promise.all(authors.map(async (author) => {
    // Espera a que getBookCountByAuthorId devuelva el conteo de libros
    const bookCount = await getBookByAuthorId(author.id);
    return {
      ...author.dataValues,
      bookCount : bookCount.length,
    };
  }));

 console.log(authors);
 
  res.render("author/index", {
    authors,
  });
}

function createAuthor(req, res) {
  const { name, email } = req.body;
  Author.create({ name, email }).then((author) => {
    res.redirect("/author");
  });
}

function updateAuthor(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;
  Author.update({ name, email }, { where: { id } }).then(() => {
    res.redirect("/author");
  });
}

function deleteAuthor(req, res) {
  const { id } = req.params;
  Author.destroy({ where: { id } }).then(() => {
    Book.destroy({ where: { authorId: id } });
    res.redirect("/author");
  });
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getCreateAuthor,
  index,
};
