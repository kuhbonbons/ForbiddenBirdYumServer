/**
 * Creates a ModelObject of Sequelize Models which is injected into root fastify,
 * to be accessible from everywhere within the app
 * @param  {Sequelize} sequelize - Sequelize instance
 * @param  {Object[]} models - Array of models
 */
function modelAssembler(sequelize, models) {
  return models.reduce((acc, model) => ({
    ...acc,
    [model.key]: sequelize.define(model.key, model.definition, model.options),
  }), {});
}

module.exports = {
  modelAssembler,
};
