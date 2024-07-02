module.exports=(sequelize, DataTypes) => {
    const dislike=sequelize.define("dislike",{ idDislike:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    }
    
    });
     return dislike;};