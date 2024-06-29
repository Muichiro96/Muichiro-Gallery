module.exports=(sequelize, DataTypes) => {
const message=sequelize.define("message",{ idMessage :{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
},
name : {
    type: DataTypes.STRING
},
email:{
    type: DataTypes.STRING
},
message: {
    type: DataTypes.STRING
}

});
 return message;};