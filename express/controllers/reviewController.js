
const db = require("../models");

exports.createReview=(req,res)=>{
    db.review.create({
        rate : req.body.rate,
        review: req.body.review,
        publicationId: req.body.pubId,
        userId : req.userId
    });
    res.json({message: "Thanks For Your Review :)"});
    return;
};
exports.hasReview=async(req,res)=>{
    const review =await db.review.findOne({where:{
        publicationId : req.params.id,
        userId : req.userId
    }});
    if(review){
        res.json({has:true});
        return;
    }else{
        res.json({has:false});
        return;
    };
}
exports.getReviews=async(req,res)=>{
    const Reviews=await db.review.findAll({where:{ publicationId : req.params.id,

    }});
    res.json({reviews: Reviews});
}
exports.getAverageRate=async(req,res)=>{
    console.log(req.params);
    const avg=await db.review.findAll({
        where:{ publicationId: req.params.id},
        attributes: [
            [db.Sequelize.fn('AVG', db.Sequelize.col('rate')), 'avgRating'],
          ]
    });
    console.log(avg[0].dataValues.avgRating);
    res.json({avg :avg[0].dataValues.avgRating});
}
