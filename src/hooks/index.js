const config = require('config');
const authService = require('../services/auth');

const authHook = async (fastify, request, response) => {
  const { at: accessToken } = request.cookies;
  if (!accessToken) throw fastify.httpErrors.forbidden();
  const { Token } = fastify.models;
  const valid = await Token.verifyToken(accessToken, config.get('jwtAccessSecret'));
  if (!valid) {
    const { rt: refreshToken } = request.cookies;
    if (!refreshToken) throw fastify.httpErrors.forbidden();
    const newAccessToken = await authService.generateAccessToken(fastify, refreshToken);
    response.setCookie('at', newAccessToken);
  }
};

module.exports = {
  authHook,
};
