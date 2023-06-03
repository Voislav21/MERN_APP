

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user',
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: { 
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  });

  return User;

};