'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 
      // define association here

      Profile.hasMany(models.Post)
      Profile.belongsTo(models.User, { foreignKey: 'UserId' })
    }
    getDate(){
      return new Date (this.birthdate).toISOString().split('T')[0]
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull :{
          msg: `name cant not be null`
        },
        notEmpty:{
          msg: `name cant not be empty`
        }
      }
    },
    photoProfile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `photoprofile cant not be null`
        },
        notEmpty: {
          msg: `photop cant not be empty`
        }
      }
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: `birthdate cant not be null`
        },
        notEmpty: {
          msg: `birthdate cant not be empty`
        }
      }
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `bio cant not be null`
        },
        notEmpty: {
          msg: `bio cant not be empty`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (profile, options) => {
        profile.photoProfile = `https://avatars.dicebear.com/api/adventurer/${profile.name}.svg`
      },
    },
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};