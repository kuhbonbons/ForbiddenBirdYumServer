const {
  Model,
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static hashPassword(password) {
      return bcrypt.hash(password, 10);
    }

    verifyPassword(password) {
      return bcrypt.compare(password, this.password);
    }

    static associate(models) {
      // define association here
      this.hasOne(models.Token, { constraints: false, foreignKey: 'user_id' });
      this.hasMany(models.Note, { constraints: false, foreignKey: 'user_id' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
