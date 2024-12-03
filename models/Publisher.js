const sequalizer = require("sequelize");
const connection = require("../contexts/AppContext");



const Publisher = connection.define("publisher", {
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
    phone: {
        type: sequalizer.STRING,
        allowNull: false,
    },
    country: {
        type: sequalizer.STRING,
        allowNull: false,
    },
    });

    module.exports = Publisher;