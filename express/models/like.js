module.exports=(sequelize, DataTypes) => {
    const like=sequelize.define("like",{ idLike:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    }
    
    });
     return like;};