const Book = require("../models/Book");
const Author = require("../models/Author");
const Genre = require("../models/Genre");
const Publisher = require("../models/Publisher");
const moment = require("moment");
const { promises } = require("fs");

async function filter(req, res) {
  const categories = req.query.categories;
  const title = req.query.title;
  let books = await Book.findAll();
  let genres = await Genre.findAll();
  genres = genres.map((genre) => genre.dataValues);

  books = books.map((book) => book.dataValues);
  if (categories) {
    books = books.filter((book) =>
      categories.includes(book.GenreId.toString())
    );
  }
  if (title) {
    books = books.filter((book) =>
      book.title.toLowerCase().startsWith(title.toLowerCase())
    );
  }
  books = await booksMapper(books);

  res.render("Home/index", { books, genres });
}

async function index(req, res) {
  try {
    let books = await Book.findAll();
    let genres = await Genre.findAll();
    genres = genres.map((genre) => genre.dataValues);
    books = books.map((book) => book.dataValues);
    books = await booksMapper(books);
    console.log(books);

    res.render("Home/index", { books, genres });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the books" });
  }
}

async function booksMapper(books) {
  const booksresult = await Promise.all(
    books.map(async (book) => {
      const author = await Author.findByPk(book.AuthorId);
      const publisher = await Publisher.findByPk(book.PublisherId);
      const genre = await Genre.findByPk(book.GenreId);

      book.year = moment(`01-01-${book.year}`, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );

      // Asegurarse de que las propiedades sean propias del objeto
      return {
        ...book,
        AuthorName: author ? author.name : null,
        PublisherName: publisher ? publisher.name : null,
        GenreName: genre ? genre.name : null,
      };
    })
  );

  return booksresult;
}
async function detailsbyid(req, res) {
  const id = req.params.id;
  let book = await Book.findByPk(id);

  if (!book || !id) {
    res.redirect("/home");
  }

  book = book.dataValues;
  book = await booksMapper([book]);
  book = await Promise.all( book.map(async (book) => {
    const publisher = await Publisher.findByPk(book.PublisherId);
    return{
      ...book,
      PublisherPhone : publisher ? publisher.phone : null,
      PublisherCountry : publisher ? publisher.country : null,
    }
  }));
  book = book[0];
  console.log(book);
  res.render("Home/detail", { book });
}
module.exports = {
  index,
  filter,
  detailsbyid,
};
