const Sequelize = require("sequelize");
const connection = require("../connection/database");
const bcrypt = require("bcryptjs");

const Users = connection.define("users", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    role: {
        type: Sequelize.ENUM("Admin", "Employee"),
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    phone_no: {
        type: Sequelize.STRING(13),
        allowNull: false
    },
    email_address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
        unique: true
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},
{
    hooks: {
        beforeCreate: async (Users) => {
            if (Users.changed("password")) {
                const saltRounds = 10;
                Users.password = await bcrypt.hash(Users.password, saltRounds);
            }
        },
        beforeUpdate: async (users) => {
            if (users.changed("password")) {
                const saltRounds = 10;
                users.password = await bcrypt.hash(users.password, saltRounds);
            }
        },
    },
},
{
    tableName: "users",
    timestamps: true
});

Users.prototype.validatePassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

module.exports = Users;