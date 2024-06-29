module.exports=(sequelize, DataTypes) => {
    const review=sequelize.define("review",{ idReview:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },rate :{
        type: DataTypes.INTEGER
    },
    review:{
        type: DataTypes.STRING
    }
    
    });
     return review;};