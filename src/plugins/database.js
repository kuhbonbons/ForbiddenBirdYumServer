const Sequelize = require('sequelize');
const fastifyPlugin = require('fastify-plugin');
const models = require('../models');

const { modelAssembler, createAssociations } = require('../utils/model');
/**
 * Plugin to handle Database connection and syncing all models
 * @param  {FastifyInstance} fastify
 * @param  {Object} options
 */
module.exports = fastifyPlugin(async (fastify, options) => {
  const {
    database, host, user, password,
  } = options.fby;
  const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    logging: (msg) => fastify.log.info(msg),
  });

  try {
    await sequelize.authenticate();
    const modelObject = modelAssembler(sequelize, models);
    await createAssociations(modelObject);
    fastify.decorate('sequelize', sequelize);
    fastify.decorate('models', modelObject);
    fastify.decorate('session', null);
    fastify.log.info('Connection to Database successful');
  } catch (error) {
    fastify.log.error('Unable to connect to Database');
  }
});
