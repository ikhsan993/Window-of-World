'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       profile.belongsTo(models.user,{
             as : 'user',
            foreignKey : {
            name : 'userId',
            }
          })
    }
  };
  profile.init({
    userId: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    gender: DataTypes.STRING,
    photo: DataTypes.TEXT,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};