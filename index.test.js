const { sequelize } = require("./db");
const { User, Cheese, Board } = require("./index");

describe("model creation tests", () => {
  test("User model can be created", async () => {
    await sequelize.sync({ force: true });

    let user1 = await User.create({ name: "Danny", email: "Danny@gmail.com" });
    expect(user1.name).toBe("Danny");
    expect(user1.email).toBe("Danny@gmail.com");
  });

  test("Board model can be created", async () => {
    await sequelize.sync({ force: true });

    let board1 = await Board.create({
      type: "checkered",
      description: "Black & White",
      rating: 9,
    });
    expect(board1.type).toBe("checkered");
    expect(board1.description).toBe("Black & White");
    expect(board1.rating).toBe(9);
  });

  test("Cheese model can be created", async () => {
    await sequelize.sync({ force: true });

    let cheese1 = await Cheese.create({
      title: "Cheddar",
      description: "scrumptious",
    });

    expect(cheese1.title).toBe("Cheddar");
    expect(cheese1.description).toBe("scrumptious");
  });
});
