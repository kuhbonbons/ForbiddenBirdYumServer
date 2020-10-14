const config = require('config');
const authService = require('../services/auth');

const authHook = async (fastify, request, response) => {
  if (!request.cookies) throw fastify.httpErrors.forbidden();
  const { at: accessToken } = request.cookies;
  let user;
  const { Token } = fastify.models;
  if (accessToken) {
    user = await Token.verifyToken(accessToken, config.get('jwtAccessSecret'));
  }
  if (!user) {
    const newAccessToken = await authService.generateAccessToken(fastify, request.cookies);
    response.clearCookie('at');
    response.setCookie('at', newAccessToken);
  } else {
    // eslint-disable-next-line no-param-reassign
    fastify.session = user;
  }
};

module.exports = {
  authHook,
};
