module.exports=(sequelize, DataTypes) => {
    const favorite=sequelize.define("favorite",{ idFavorite :{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    }
    
    });
     return favorite;};