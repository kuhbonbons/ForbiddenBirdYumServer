const UserController = require('../controllers/user');
const NoteController = require('../controllers/note');
const { signUpSchema, loginSchema } = require('../schemas/user');
const {
  createNote, updateNote, deleteNote, findNote,
} = require('../schemas/note');
const { authHook } = require('../hooks');

async function router(fastify) {
  // Healthcheck
  fastify.get('/', async () => 'OK');

  // Public Routes
  fastify.post('/signup', { schema: signUpSchema }, UserController.signUp.bind(UserController, fastify));
  fastify.post('/login', { schema: loginSchema }, UserController.login.bind(UserController, fastify));
  fastify.delete('/logout', UserController.logout.bind(null, fastify));

  // Private Routes
  fastify.get('/testauth', { preHandler: authHook.bind(null, fastify) }, async () => 'OK');
  fastify.get('/notes', { preHandler: authHook.bind(null, fastify) }, NoteController.list.bind(NoteController, fastify));
  fastify.post('/notes', { preHandler: authHook.bind(null, fastify), schema: createNote }, NoteController.create.bind(NoteController, fastify));
  fastify.get('/notes/:id', { preHandler: authHook.bind(null, fastify), schema: findNote }, NoteController.find.bind(NoteController, fastify));
  fastify.patch('/notes/:id', { preHandler: authHook.bind(null, fastify), schema: updateNote }, NoteController.update.bind(NoteController, fastify));
  fastify.delete('/notes/:id', { preHandler: authHook.bind(null, fastify), schema: deleteNote }, NoteController.remove.bind(NoteController, fastify));
}

module.exports = router;
