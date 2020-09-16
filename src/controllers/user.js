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

module.exports = {
  signUp,
};
