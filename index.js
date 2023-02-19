const { User } = require("./User");
const { Board } = require("./Board");
const { Cheese } = require("./Cheese");

User.hasMany(Board);
Board.belongsTo(User);

Board.hasMany(Cheese);
Cheese.belongsToMany(Board, { through: "Board_Cheese" });
module.exports = {
  User,
  Board,
  Cheese,
};
