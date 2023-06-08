

const { DataTypes } = require('sequelize');

const commentModel = (sequelize) => {
  const Comments = sequelize.define('Comment', {
    content: DataTypes.TEXT
  });

  Comments.associate = (models) => {
    Comments.belongsTo(models.User);
    Comments.belongsTo(models.Post);
  };

  return Comments;
};

module.exports = commentModel;