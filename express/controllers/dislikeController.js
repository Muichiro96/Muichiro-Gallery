const db = require("../models");
exports.dislikeBtn=async (req,res)=>{
 const revId=req.body.id;
 const idUser=req.userId;
 console.log(req.body);
 const dislike=await db.dislike.findOne({
    where:{reviewId:revId,
        userId: idUser
    }
 });
 if(dislike){
    await db.dislike.destroy({ where:{
        reviewId:revId,
        userId: idUser
    }});
    
   
    res.json({message:"undislike"});
    return;
 }else{
    db.dislike.create({
        reviewId:revId,
        userId: idUser
    });
    
    
    res.json({message:"dislike"});
    return;
 }
 
};

