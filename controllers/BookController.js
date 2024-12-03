const Book = require("../models/Book");
const Author = require("../models/Author");
const Publisher = require("../models/Publisher");
const moment = require("moment");
const Genre = require("../models/Genre");
const { sendEmail } = require("../services/EmailService");

var formidable = require("formidable");
var fs = require("fs");
var path = require("path");
const { log } = require("console");

function getBookByGenreId(id) {
  return Book.findAll({
    where: { GenreId: id },
  });
}

function getBookByAuthorId(id) {
  return Book.findAll({
    where: { AuthorId: id },
  });
}

function getBookByPublisherId(id) {
  return Book.findAll({
    where: { PublisherId: id },
  });
}

async function index(req, res) {
  try {
    let books = await Book.findAll();

   
    books = await Promise.all(books.map(async (book) => {
      const author = await Author.findByPk(book.AuthorId);
      const publisher = await Publisher.findByPk(book.PublisherId);
      const genre = await Genre.findByPk(book.GenreId);

     
      book.year = moment(`01-01-${book.year}`, "DD-MM-YYYY").format("YYYY-MM-DD");

     
      book.dataValues.AuthorName = author ? author.name : null;
      book.dataValues.PublisherName = publisher ? publisher.name : null;
      book.dataValues.GenreName = genre ? genre.name : null;

      return book;
    }));

    books = books.map((book) => book.dataValues);
    console.log(books);
    
    res.render("Book/index", { books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the books" });
  }
}

function getBookById(req, res) {
  const { id } = req.params;
  Book.findByPk(id, {
    include: [Author, Publisher, Genre],
  }).then((book) => {
    res.json(book);
  });
}

async function getCreatepage(req, res) {
  const id = req.params.id;
  let bookbyid = await Book.findByPk(id);
  if (bookbyid) {
    bookbyid = bookbyid.dataValues;
    bookbyid.year = moment(`01-01-${bookbyid.year}`, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
  }

  let authors = await Author.findAll();

  authors = authors.map((author) => {
    return { id: author.id, name: author.name };
  });

  let publishers = await Publisher.findAll();
  publishers = publishers.map((publisher) => {
    return { id: publisher.id, name: publisher.name };
  });
  let genres = await Genre.findAll();
  genres = genres.map((genre) => {
    return { id: genre.id, name: genre.name };
  });

  res.render("Book/createBook", {
    id,
    authors,
    publishers,
    genres,
    book: bookbyid,
  });
}

async function createBook(req, res) {
  const { title, year, AuthorId, PublisherId, GenreId } = req.body;
  const file = req.file;
  if (!file) {
    res.redirect("/book");
  }
  const picture =  file.path.replace(/^public/, "");

  const [publisher, author, genre] = await Promise.all([
    Publisher.findByPk(PublisherId),
    Author.findByPk(AuthorId),
    Genre.findByPk(GenreId),
  ]);

  if (!publisher || !author || !genre) {
    res.redirect("/books");
  }
  sendEmail(author.email, title);
  Book.create({ title, year, picture, AuthorId, PublisherId, GenreId }).then(
    (book) => {
      res.redirect("/book");
    }
  );
}

async function updateBook(req, res) {
  const { id } = req.params;
  const { title, year, AuthorId, PublisherId, GenreId } = req.body;
  const file = req.file;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    console.log(book);
    if (file) {
      book.picture = file.path.replace(/^public/, "");
    }

    await book.update({
      title,
      year,
      picture: book.picture,
      AuthorId,
      PublisherId,
      GenreId,
    });

    res.redirect("/book");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the book" });
  }
}

function deleteBook(req, res) {
  const { id } = req.params;
  Book.destroy({ where: { id } }).then(() => {
   res.redirect("/book");
  });
}

module.exports = {
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookByGenreId,
  getBookByAuthorId,
  getBookByPublisherId,
  getCreatepage,
  index,

};
