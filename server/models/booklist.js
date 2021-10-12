'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       booklist.belongsTo(models.book,{
        as : 'book',
        foreignKey : {
          name : 'bookId',
        },
      }),
        booklist.belongsTo(models.user,{
        as : 'user',
        foreignKey : {
          name : 'userId',
        }
      })
    }
    
  };
  booklist.init({
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'booklist',
  });
  return booklist;
};