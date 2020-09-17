require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const config = require('config');

const PORT = process.env.PORT || 3000;

fastify.register(require('./src/plugins/database'), {
  fby: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});
fastify.register(require('fastify-helmet'));
fastify.register(require('fastify-cors'));
fastify.register(require('fastify-cookie'), {
  secret: config.get('cookieSecret'),
});
fastify.register(require('fastify-sensible'));
fastify.register(require('./src/routes'));

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
