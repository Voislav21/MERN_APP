

const { DataTypes } = require('sequelize');

const userModel = (sequelize) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: { 
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    bio: DataTypes.STRING
  });

  return User;
};

module.exports = userModel;
