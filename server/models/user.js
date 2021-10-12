'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    user.hasOne(models.profile, {
    as: "profile",
    foreignKey: {
      name: "userId",
    },
  }),
    user.hasMany(models.booklist, {
    as: "booklist",
    foreignKey: {
      name: "userId",
    },
  }),
    user.hasMany(models.transaction, {
    as: "transaction",
    foreignKey: {
      name: "userId",
    },
  })
    }
  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};