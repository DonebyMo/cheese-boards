const { User } = require("./User");
const { Board } = require("./Board");
const { Cheese } = require("./Cheese");

User.hasMany(Board);
Board.belongsTo(User);

module.exports = {
  User,
  Board,
  Cheese,
};
