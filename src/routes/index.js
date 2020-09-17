const UserController = require('../controllers/user');
const { signUpSchema, loginSchema } = require('../schemas/user');
const { authHook } = require('../hooks');

async function router(fastify) {
  // Healthcheck
  fastify.get('/', async () => 'OK');
  fastify.get('/testauth', { preHandler: authHook.bind(null, fastify) }, async () => 'OK');
  fastify.post('/signup', { schema: signUpSchema }, UserController.signUp.bind(UserController, fastify));
  fastify.post('/login', { schema: loginSchema }, UserController.login.bind(UserController, fastify));
  fastify.delete('/logout', UserController.logout.bind(null, fastify));
}

module.exports = router;
