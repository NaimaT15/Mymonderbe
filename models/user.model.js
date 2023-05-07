const sequelize = require("sequelize");
const db = require("../connection");
const bcrypt = require("bcrypt");

const User = db.define("users",
    {
        id:
        {
            type: sequelize.UUID,
            primaryKey: true,
            defaultValue: sequelize.UUIDV1,
        },
        name: {
            type: sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: sequelize.STRING,
            allowNull: false,
        },
        gender: {
            type: sequelize.STRING,
            allowNull: false,
        },
        birthDate: {
            type: sequelize.DATE,
            allowNull: true,
        },
        email: {
            type: sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        role: {
            type: sequelize.ENUM,
            allowNull: false,
            values: ["super-admin", "admin", "customer"]
        },
        password: {
            type: sequelize.STRING,
            allowNull: false,
        },
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, "a");
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, "a");
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
        },
        instanceMethods: {
            validPassword: (password) => {
                console.log("password : ", password);
                return bcrypt.compareSync(password, this.password);
            },
        },
    }
);
User.prototype.validPassword = (password, hashed) => {
    return bcrypt.compareSync(password, hashed);
};

User.sync()
    .then(() => console.log("Synced Succesfull"))
    .catch((err) => console.log("err:", err));

module.exports = User;