
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        imageUrl: DataTypes.STRING
    });

    Post.associate = (models) => {
        Post.belongsTo(models.user);
        Post.hasMany(models.comment);
        Post.hasMany(models.like);
    };

    return Post;
}