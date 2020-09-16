const Sequelize = require('sequelize');
const models = require('../models');
const { modelAssembler } = require('../utils/model');
/**
 * Plugin to handle Database connection and syncing all models
 * @param  {FastifyInstance} fastify
 * @param  {Object} options
 */
module.exports = async function DBConnector(fastify, options) {
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
    await sequelize.sync();
    fastify.decorate('sequelize', sequelize);
    fastify.decorate('models', modelObject);
    fastify.log.info('Connection to Database successful');
  } catch (error) {
    fastify.log.error('Unable to connect to Database');
  }
};
