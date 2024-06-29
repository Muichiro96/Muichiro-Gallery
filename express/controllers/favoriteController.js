const db = require("../models");
exports.favoriteBtn=async (req,res)=>{
 const pubID=req.body.publicationId;
 const idUser=req.userId;
 console.log(req.body);
 const favorite=await db.favorite.findOne({
    where:{publicationId:pubID,
        userId: idUser
    }
 });
 if(favorite){
    await db.favorite.destroy({ where:{publicationId:pubID,
        userId: idUser
    }})
    res.json({message:"unfavorite"});
    return;
 }else{
    db.favorite.create({
        publicationId:pubID,
        userId: idUser
    });
    res.json({message:"favorite"});
    return;
 }
 
};
exports.getUserFavorites=async (req,res)=>{
    const favorites=await db.favorite.findAll({
        where:{
            userId : req.userId
        }
    });
    res.json({favorites: favorites});
    return;
}