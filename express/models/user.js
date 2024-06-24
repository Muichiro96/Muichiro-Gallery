module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },
      username: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      isAdmin :{
        type: DataTypes.BOOLEAN
      }
    });
  
    return user;
  };