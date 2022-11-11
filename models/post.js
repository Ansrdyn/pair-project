'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Post.belongsTo(models.Profile, { foreignKey: "ProfileId" });
    }
  }
  Post.init({
    name: DataTypes.STRING,
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `content cant not be null`
        },
        notEmpty: {
          msg: `content cant not be empty`
        }
      }
    },
    like: {
      type : DataTypes.INTEGER,
      defaultValue: 0
    },
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};