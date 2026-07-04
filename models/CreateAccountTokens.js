const Sequelize = require("sequelize");
const connection = require("../connection/database");

const CreateAccountTokens = connection.define("create_account_tokens", {
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
    tableName: "create_account_tokens",
    timestamps: true
});

module.exports = CreateAccountTokens;