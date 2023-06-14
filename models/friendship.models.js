// friendship.model.js
const { DataTypes, Sequelize } = require('sequelize');

const friendshipModel = (sequelize) => {
  class Friendship extends Sequelize.Model {}

  Friendship.init(
    {
      status: {
        type: DataTypes.ENUM('pending', 'accepted'),
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      modelName: 'Friendship',
    }
  );

  return Friendship;
};

module.exports = friendshipModel;
