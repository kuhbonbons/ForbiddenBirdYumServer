async function router(fastify) {
  // Healthcheck
  fastify.get('/', async () => 'OK');
}

module.exports = router;
