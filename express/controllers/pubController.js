const db = require("../models");
exports.getPublications=(req,res)=>{
    const publications= db.publication.findAll({
    where:{
        status : "approved"
    }
 });
 if(publications){
    res.json({ publications: publications});
    return;
 }else{
    res.json({message : "0 Publication Found"});
    return;
 }
};
exports.getPublication=(req,res)=>{
    const id=parseInt(req.params.id);
 const publication = db.publication.findOne({
    where:{
        status : "approved",
        id: id
    }
 });
 if(publication){
    res.json({
        publication: publication
    })
    return;
 }
 else{
    res.status(404).json({message : "publication not found"});
    return;
 }
};
    