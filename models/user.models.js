const { DataTypes, Sequelize } = require('sequelize');

const userModel = (sequelize) => {
  class User extends Sequelize.Model {
    static associate(models) {
      User.belongsToMany(models.User, {
        through: models.Friendship,
        foreignKey: 'userId',
        as: 'friends',
      });
    }

    async friendsList() {
      const friends = await this.getFriends({
        attributes: ['id', 'firstName', 'lastName', 'email', 'profilePic'],
      });

      return friends;
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      profilePic: DataTypes.STRING,
      bio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};

module.exports = userModel;

