module.exports = (sequelize, DataTypes) => {
    const publication=sequelize.define("publication",{idPublication: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
},title : {
    type: DataTypes.STRING
},
description:{
    type: DataTypes.STRING
},
status: {
    type: DataTypes.STRING
},
imagePath: {
    type: DataTypes.STRING
}

});
 return publication;};