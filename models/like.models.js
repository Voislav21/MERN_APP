
module.exports = (sequelize, DataTypes) => {
    Like = sequelize.define('like', {
        liked: DataTypes.BOOLEAN
    });

    Like.associate = (models) => {
        Like.belongsTo(models.user);
        Like.belongsTo(models.post);
    };

    return Like;
}