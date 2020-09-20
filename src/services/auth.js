const config = require('config');

async function generateAccessToken(fastify, user) {
  const { Token } = fastify.models;
  const token = await Token.findOne({
    where: { user_id: user.id },
  });
  if (!token) throw fastify.httpErrors.forbidden();
  const accessToken = await Token.generateJwt(user, config.get('jwtAccessSecret'), { expiresIn: '1h' });
  return accessToken;
}

module.exports = {
  generateAccessToken,
};
