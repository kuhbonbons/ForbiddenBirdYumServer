const config = require('config');
const authService = require('../services/auth');

const authHook = async (fastify, request, response) => {
  const { at: accessToken } = request.cookies;
  let user;
  const { Token } = fastify.models;
  if (accessToken) {
    user = await Token.verifyToken(accessToken, config.get('jwtAccessSecret'));
  }
  if (!user) {
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
