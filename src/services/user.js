const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const config = require('config');

async function createUser(fastify, { username, email, password }) {
  const { User } = fastify.models;
  const user = await User.findOne({
    where: { [Op.or]: { username, email } },
  });
  if (user) throw fastify.httpErrors.conflict();
  const hash = await User.hashPassword(password);
  await User.create({
    username,
    password: hash,
    email,
  });
}

async function loginUser(fastify, { username, password }) {
  const { User, Token } = fastify.models;
  const user = await User.findOne({
    where: { username },
  });
  if (!user) throw fastify.httpErrors.forbidden();
  const isSame = await user.verifyPassword(password);
  if (!isSame) throw fastify.httpErrors.forbidden();
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  const accessToken = jwt.sign(payload, config.get('jwtAccessSecret'), { expiresIn: '30m' });
  const refreshToken = jwt.sign(payload, config.get('jwtRefreshSecret'));
  await Token.upsert({ user_id: user.id, token: refreshToken });
  return { accessToken, refreshToken };
}
module.exports = {
  createUser,
  loginUser,
};