const config = require('config');
const authService = require('../services/auth');

const authHook = async (fastify, request, response) => {
  const { at: accessToken } = request.cookies;
  if (!accessToken) throw fastify.httpErrors.forbidden();
  const { Token } = fastify.models;
  let user = await Token.verifyToken(accessToken, config.get('jwtAccessSecret'));
  if (!user) {
    const { rt: refreshToken } = request.cookies;
    if (!refreshToken) throw fastify.httpErrors.forbidden();
    user = await Token.verifyToken(refreshToken, config.get('jwtRefreshSecret'));
    if (!user) throw fastify.httpErrors.forbidden();
    const newAccessToken = await authService.generateAccessToken(fastify, user);
    response.clearCookie('at');
    response.setCookie('at', newAccessToken);
  }
  // eslint-disable-next-line no-param-reassign
  fastify.session = user;
};

module.exports = {
  authHook,
};
