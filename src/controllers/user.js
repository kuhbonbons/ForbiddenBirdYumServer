const config = require('config');
const UserService = require('../services/user');

async function signUp(fastify, request, response) {
  try {
    await UserService.createUser(fastify, request.body);
    response.code(204);
    return null;
  } catch (error) {
    fastify.log.error('Error while creating user');
    throw error;
  }
}

async function login(fastify, request, response) {
  try {
    const { accessToken, refreshToken } = await UserService.loginUser(fastify, request.body);
    response.setCookie('at', accessToken);
    response.setCookie('rt', refreshToken, { httpOnly: true });
    response.status(204);
    return null;
  } catch (error) {
    fastify.log.error('Error while logging in');
    throw error;
  }
}

async function logout(fastify, request, response) {
  try {
    const { rt: refreshToken } = request.cookies;
    const { Token } = fastify.models;
    const user = await Token.verifyToken(refreshToken, config.get('jwtRefreshSecret'));
    if (user) {
      await Token.destroy({
        where: { user_id: user.id },
      });
    }
    response.clearCookie('rt');
    response.clearCookie('at');
    response.status(204);
    return null;
  } catch (error) {
    fastify.log.error('Error while logging out');
    throw error;
  }
}

module.exports = {
  signUp,
  login,
  logout,
};
