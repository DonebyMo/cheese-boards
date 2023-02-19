const { Sequelize, sequelize } = require("./db");

let Board = sequelize.define("board", {
  type: Sequelize.STRING,
  description: Sequelize.STRING,
  rating: Sequelize.INTEGER,
});

module.exports = {
  Board,
};
