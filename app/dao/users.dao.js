const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async function (user, done) {
  const createdUser = await prisma.user.create({
    data: {
      ...user,
    },
  });
  console.log("created user", createdUser);
  if (!createdUser) {
    return done("error");
  }

  done(null, createdUser);
};

const getUser = async function (id, done) {
  const user = await prisma.user.findMany({
    where: {
      user_name: id.user_name,
      user_password: id.user_password,
    },
  });
  if (!user) {
    return done("error");
  }
  // console.log("users",users);
  done(null, user);
};

const getUsers = async function (done) {
  const users = await prisma.user.findMany();
  if (!users) {
    return done("error");
  }
  // console.log("users",users);
  done(null, users);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
};
