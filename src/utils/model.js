const { DataTypes } = require('sequelize');

/**
 * Creates a ModelObject of Sequelize Models which is injected into root fastify,
 * to be accessible from everywhere within the app
 * @param  {Sequelize} sequelize - Sequelize instance
 * @param  {Object[]} models - Array of models
 */
function modelAssembler(sequelize, models) {
  return models.reduce((acc, model) => {
    const modelInstance = model(sequelize, DataTypes);
    return {
      ...acc,
      [modelInstance.name]: modelInstance,
    };
  }, {});
}

function createAssociations(modelObject) {
  return new Promise((resolve) => {
    Object.values(modelObject).map((model) => model.associate && model.associate(modelObject));
    resolve();
  });
}

module.exports = {
  modelAssembler,
  createAssociations,
};
