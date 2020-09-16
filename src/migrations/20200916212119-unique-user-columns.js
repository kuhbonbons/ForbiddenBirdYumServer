const { DataTypes } = require('sequelize');
/* eslint-disable implicit-arrow-linebreak */
module.exports = {
  up: async (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) => Promise.all([
      queryInterface.changeColumn('Users', 'username', { type: DataTypes.STRING, allowNull: false, unique: true }, { transaction }),
      queryInterface.changeColumn('Users', 'email', { type: DataTypes.STRING, allowNull: false, unique: true }),
    ])),

  down: async (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) => Promise.all([
      queryInterface.removeConstraint('Users', 'username', { transaction }),
      queryInterface.removeConstraint('Users', 'email', { transaction }),
    ]))
  ,
};
