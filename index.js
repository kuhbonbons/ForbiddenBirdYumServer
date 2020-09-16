require('dotenv').config();
const fastify = require('fastify')({ logger: true });

const PORT = process.env.PORT || 3000;

fastify.register(require('./src/plugins/database'), {
  fby: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});
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
