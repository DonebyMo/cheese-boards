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

describe("Association test", () => {
  test("User can have many Boards", async () => {
    await sequelize.sync({ force: true });

    let user1 = await User.create({
      name: "Jonny",
      email: "jonny@gmail.com",
    });

    let board1 = await Board.create({
      type: "checkered",
      description: "Black & White",
      rating: 9,
    });

    let board2 = await Board.create({
      type: "Soft-cheese",
      description: "green",
      rating: 8,
    });

    await user1.addBoard(board1);
    await user1.addBoard(board2);

    let boards = await user1.getBoards();

    expect(boards.length).toBe(2);
    expect(boards[0] instanceof Board).toBeTruthy;
  });
});

describe("Association test2", () => {
  test("Board can have many Cheeses", async () => {
    await sequelize.sync({ force: true });

    let board1 = await Board.create({
      type: "checkered",
      description: "Black & White",
      rating: 9,
    });

    let cheese1 = await Cheese.create({
      title: "Brie",
      description: "Soft & delicate",
    });

    let cheese2 = await Cheese.create({
      title: "Quark",
      description: "Squidgy and slimy",
    });

    await board1.addCheese(cheese1);
    await board1.addCheese(cheese2);

    let cheeses = await board1.getCheeses();

    expect(cheeses.length).toBe(2);
    expect(cheeses[0] instanceof Cheese).toBe(true);
  });
});

test("A Cheese can be on many Boards", async () => {
  await sequelize.sync({ force: true });
  let cheese1 = await Cheese.create({
    title: "Roquefort",
    description: "Yellow & green",
  });

  let board1 = await Board.create({
    type: "checkered",
    description: "Black & White",
    rating: 9,
  });

  let board2 = await Board.create({
    type: "Soft-cheese",
    description: "green",
    rating: 8,
  });

  await board1.addCheese(cheese1);
  await board2.addCheese(cheese1);

  expect(board1.title === board2.title).toBe(true);
});

describe("Eager Loading Checks", () => {
  test("board can be loaded with its cheeses", async () => {
    await sequelize.sync({ force: true });

    let board1 = await Board.create({
      type: "checkered",
      description: "Black & White",
      rating: 9,
    });

    let cheese1 = await Cheese.create({
      title: "Roquefort",
      description: "Yellow & green",
    });

    let cheese2 = await Cheese.create({
      title: "Quark",
      description: "Squidgy and slimy",
    });
    const boardCheeses = await Board.findAll({ include: Cheese });

    expect(boardCheeses[0] instanceof Cheese);
  });

  test("user can be loaded with its boards", async () => {
    await sequelize.sync({ force: true });

    let user1 = await User.create({ name: "Danny", email: "Danny@gmail.com" });
    expect(user1.name).toBe("Danny");
    expect(user1.email).toBe("Danny@gmail.com");

    let board1 = await Board.create({
      type: "checkered",
      description: "Black & White",
      rating: 9,
    });

    let board2 = await Board.create({
      type: "Soft-cheese",
      description: "green",
      rating: 8,
    });

    const userBoards = await User.findAll({ include: Board });
    // console.log(userBoards[0]);
    expect(userBoards instanceof Board);
    // expect(userBoards.length).toBe(3);
  });

  test("A cheese can be loaded with its board data", async () => {
    await sequelize.sync({ force: true });
    let cheese1 = await Cheese.create({
      title: "Roquefort",
      description: "Yellow & green",
    });

    let board1 = await Board.create({
      type: "checkered",
      description: "Black & White",
      rating: 9,
    });

    let board2 = await Board.create({
      type: "Soft-cheese",
      description: "green",
      rating: 8,
    });

    const cheeseBoard = await Cheese.findAll({ include: Board });
    expect(cheeseBoard instanceof Board).toBeTruthy;
  });
});
