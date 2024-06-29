const db = require("../models");
exports.getPublications=async (req,res)=>{
    const publications=await db.publication.findAll({
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
exports.getPublication=async (req,res)=>{
    const id=parseInt(req.params.id);
    
    const title=req.params.title;
 const publication =await db.publication.findOne({include:[{association: 'publisher',attributes: ["username"]}],
    where:{
        status : "approved",
        idPublication: id,
        title: title
    }
 });
 if(publication){
    res.json({
        image: publication
    })
    return;
 }
 else{
    res.json({message : "publication not found"});
    return;
 }
};
exports.Publish=(req,res)=>{
   
   const filePath = `express/uploads/${req.file.filename}`
   console.log(filePath);
   db.publication.create({
      title:req.body.title,
      description: req.body.description,
      status: "pending",
      imagePath : filePath,
      userId: req.userId

   }).then(()=>{
      res.json({message : "Publication Created Successfully"});
   });
   return;
};
    