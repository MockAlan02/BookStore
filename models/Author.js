const sequalizer = require("sequelize");
const connection = require("../contexts/AppContext");



const Author = connection.define("author", {
    id: {
        type: sequalizer.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequalizer.STRING,
        allowNull: false,
    },
    email: {
        type: sequalizer.STRING,
        allowNull: false,
    },
});

module.exports = Author;

