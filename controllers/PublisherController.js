const Publisher = require("../models/Publisher");
const Book = require("../models/Book");
function getAllPublishers(req, res) {
  Publisher.findAll().then((publishers) => {
    res.json(publishers);
  });
}

function getPublisherById(req, res) {
  const { id } = req.params;
  Publisher.findByPk(id).then((publisher) => {
    res.json(publisher);
  });
}

async function index(req, res) {
  let publishers = await Publisher.findAll();
  publishers = publishers.map((publisher) => publisher.dataValues);
  const publishersWithBookCount = await Promise.all(
    publishers.map(async (publisher) => {
      const bookCount = await Book.count({
        where: { publisherId: publisher.id },
      });
      return {
        ...publisher,
        bookCount: bookCount,
      };
    })
  );

  res.render("Publisher/index", {
    publishers: publishersWithBookCount,
  });
}

async function getCreatePublisher(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.render("Publisher/createPublisher");
  }
  let publisher = await Publisher.findByPk(id);
  if (!publisher) {
    return res.redirect("/publisher/create");
  }
  publisher = publisher.dataValues;
  res.render("Publisher/createPublisher", {
    id,
    publisher,
  });
}

function createPublisher(req, res) {
  const { name, phone, country } = req.body;
  Publisher.create({ name, phone, country }).then((publisher) => {
    res.redirect("/publisher");
  });
}

function updatePublisher(req, res) {
  const { id } = req.params;
  const { name, picture } = req.body;
  Publisher.update({ name, picture }, { where: { id } }).then(() => {
    res.redirect("/publisher");
  });
}

function deletePublisher(req, res) {
  const { id } = req.params;
  Publisher.destroy({ where: { id } }).then(() => {
    Book.destroy({ where: { publisherId: id } }).then(() => {
      res.redirect("/publisher");
    });
  });
}

module.exports = {
  getAllPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  index,
  deletePublisher,
  getCreatePublisher,
};
