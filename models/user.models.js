

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user',
  {
    firsName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return User;

};