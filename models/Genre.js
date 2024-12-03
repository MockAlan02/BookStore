const sequalizer = require("sequelize");
const connection = require("../contexts/AppContext");



const Genre = connection.define("genre", {
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
    description: {
        type: sequalizer.STRING,
        allowNull: false,
    },
});

module.exports = Genre;