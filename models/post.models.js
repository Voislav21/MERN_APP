

const { DataTypes } = require('sequelize');

const postModel = (sequelize) => {
  const Posts = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
  });

  Posts.associate = (models) => {
    Posts.belongsTo(models.User);
    Posts.hasMany(models.Comment);
    Posts.hasMany(models.Likes)
  };

  return Posts;
};

module.exports = postModel;