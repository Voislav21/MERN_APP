
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        content: DataTypes.TEXT
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.user);
        Comment.belongsTo(models.post);
    };

    return Comment;
}