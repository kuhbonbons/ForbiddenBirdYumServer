const {
  Model,
} = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static verifyToken(token, secret) {
      try {
        return jwt.verify(token, secret);
      } catch (error) {
        return false;
      }
    }

    static generateJwt(payload, secret, options) {
      return jwt.sign(payload, secret, options);
    }

    static associate(models) {
      // define association here
      this.belongsTo(models.User, { constraints: true });
    }
  }
  Token.init({
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};
