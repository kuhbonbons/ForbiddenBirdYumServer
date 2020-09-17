const config = require('config');

async function generateAccessToken(fastify, refreshToken) {
  const { Token } = fastify.models.token;
  const user = await Token.verifyToken(refreshToken, config.get('jwtRefreshSecret'));
  if (!user) throw fastify.httpErrors.forbidden();
  const token = await Token.findOne({
    where: { user_id: user.id },
  });

  if (!token) throw fastify.httpErrors.forbidden();
  const accessToken = await Token.generateJwt(user, config.get('jwtAccessSecret'), { expiresIn: '30m' });
  return accessToken;
}

module.exports = {
  generateAccessToken,
};
