const AuthService = require('../services/auth');

const refreshToken = async (fastify, request) => {
  try {
    const token = await AuthService.generateAccessToken(fastify, request.cookies);
    return {
      token,
    };
  } catch (error) {
    fastify.log.error('Error while refreshing token');
    throw error;
  }
};

module.exports = {
  refreshToken,
};
