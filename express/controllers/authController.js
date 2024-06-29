const db = require("../models");
const conf = require("../config/auth.config")
const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
exports.signIn =async (req,res)=>{
    const user=await db.user.findOne({
        where:{username: req.body.username}
       }).catch(error=>{
        console.log(error);
       });
       if(user){
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if(passwordMatch){
           const token=jwt.sign({user:user.id},conf.secret,{expiresIn: '1h',});
           res.status(200).json({username:user.username, token: token ,message:"you have successfully logged in"});
           return;
        }
        
       }else{
        res.json({message: "login failed!"});
       }
    
};
exports.signUp =async (req,res)=>{
   const {username,email,password} = req.body;
   console.log(username,email,password);
   const userexist=await db.user.findOne({
    where:{username: username}
   }).catch(error=>{
    console.log(error);
   });
   if(userexist){
    res.json({message: "Username already exist"});
    return;
   }
   const userAlready=await db.user.findOne({
    where:{email: email}
   }).catch(error=>{
    console.log(error);
   });
   if(userAlready){
    res.json({message: "Email already exist"});
    return;
   }
   if(!userAlready && !userexist){
    const hashedPassword = await bcrypt.hash(password, 10);
   db.user.create({
    username: username,
    email: email,
    password: hashedPassword,
    isAdmin : false
   });
   res.json({message:"User registred succesfully"});
   return;
   }
};
exports.test = (req,res)=>{
    res.json({req : req.userId});

};
