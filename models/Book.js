const sequalizer = require("sequelize");
const connection = require("../contexts/AppContext");



const Book = connection.define("book", {
    id: {
        type: sequalizer.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: sequalizer.STRING,
        allowNull: false,
    },
    year: {
        type: sequalizer.INTEGER,
        allowNull: false,
    },
    picture: {
        type: sequalizer.STRING,
        allowNull: false,
    },
    AuthorId: {
        type: sequalizer.INTEGER,
        allowNull: false,
    },
    PublisherId: {
        type: sequalizer.INTEGER,
        allowNull: false,
    },
    GenreId: {
        type: sequalizer.INTEGER,
        allowNull: false,
    },
});

module.exports = Book;