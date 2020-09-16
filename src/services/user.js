const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

async function createUser(fastify, { username, email, password }) {
  const user = await fastify.models.User.findOne({
    where: { [Op.or]: { username, email } },
  });
  if (user) throw fastify.httpErrors.conflict();
  const hash = await bcrypt.hash(password, 10);
  await fastify.models.User.create({
    username,
    password: hash,
    email,
  });
}

module.exports = {
  createUser,
};
