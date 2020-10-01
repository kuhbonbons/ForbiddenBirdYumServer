const { Op } = require('sequelize');
const config = require('config');

async function createUser(fastify, { username, email, password }) {
  const { User } = fastify.models;
  const user = await User.findOne({
    where: { [Op.or]: { username, email } },
  });
  if (user && user.email === email) throw fastify.httpErrors.conflict('E-Mail already registered.');
  if (user && user.username === username) throw fastify.httpErrors.conflict('User already exists.');
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
  if (!user) throw fastify.httpErrors.forbidden('Username or Password did not match.');
  const isSame = await user.verifyPassword(password);
  if (!isSame) throw fastify.httpErrors.forbidden('Username or Password did not match.');
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  const [accessToken, refreshToken] = await Promise.all([
    Token.generateJwt(payload, config.get('jwtAccessSecret'), { expiresIn: '1h' }),
    Token.generateJwt(payload, config.get('jwtRefreshSecret')),
  ]);
  await Token.upsert({ user_id: user.id, token: refreshToken });
  return { accessToken, refreshToken };
}
module.exports = {
  createUser,
  loginUser,
};
