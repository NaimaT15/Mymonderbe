const { Sequelize } = require("sequelize");

const sequalize =  new Sequelize("mendor", "root", "", {
  host: "localhost",
  dialect: "mysql",
});


module.exports = sequalize;