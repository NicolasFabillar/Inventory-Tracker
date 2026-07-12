const Sequelize = require("sequelize");
const connection = require("../connection/database");

const OneTimeTokens = connection.define("one-time-tokens", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    token: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    email_address: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    role: {
        type: Sequelize.ENUM("Admin", "Employee"),
        allowNull: false
    },
    expires_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},
{
    tableName: "one-time-tokens",
    timestamps: true
});

module.exports = OneTimeTokens;