const Sequelize = require("sequelize");
const connection = require("../connection/database");

const Categories = connection.define("categories", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},
{
    tableName: "categories",
    timestamps: true
});

module.exports = Categories;