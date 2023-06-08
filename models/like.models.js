

const { DataTypes } = require('sequelize');

const likeModel = (sequelize) => {
  const Likes = sequelize.define('Likes', {
    liked: DataTypes.BOOLEAN
  });

  Likes.associate = (models) => {
    Likes.belongsTo(models.User);
    Likes.belongsTo(models.Post);
  };

  return Likes;
};

module.exports = likeModel;