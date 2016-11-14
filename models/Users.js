export default (sequelize, DataType) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    email: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true
      }
    },
  });

  return Users;
};
