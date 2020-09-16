const { DataTypes } = require('sequelize');

const User = {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = {
  key: 'user',
  definition: User,
};
