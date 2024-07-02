const { distinct } = require("rxjs");
const db = require("../models");
const like = require("../models/like");
exports.likeBtn=async (req,res)=>{
 const revId=req.body.id;
 const idUser=req.userId;

 const like=await db.like.findOne({
    where:{reviewId:revId,
        userId: idUser
    }
 });
 if(like){
    await db.like.destroy({ where:{
        reviewId:revId,
        userId: idUser
    }});
    
    
    res.json({message:"unlike"});
    return;
 }else{
    db.like.create({
        reviewId:revId,
        userId: idUser
    });
    
    res.json({message:"like"});
    return;
 }
 
};

exports.getUserLikesDislikes=async (req,res)=>{
    const likes =await db.like.findAll({ where: {userId : req.userId}});
    const dislikes=await db.dislike.findAll({ where: {userId : req.userId}});
    res.json({likes: likes,dislikes: dislikes});
}