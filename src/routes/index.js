const UserController = require('../controllers/user');
const { signUpSchema } = require('../schemas/user');

async function router(fastify) {
  // Healthcheck
  fastify.get('/', async () => 'OK');
  fastify.post('/signup', { schema: signUpSchema }, UserController.signUp.bind(UserController, fastify));
}

module.exports = router;
