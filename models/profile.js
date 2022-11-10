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
    name: DataTypes.STRING,
    photoProfile: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    bio: DataTypes.STRING,
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