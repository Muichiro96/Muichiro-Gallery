const express = require("express");
const cors = require("cors");
const {route} = require("./routes/authRoute");
const app = express();
const { router} = require("./routes/pubsRoute");
const db = require("./models");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
});
const verifyToken = require("./middlewares/authJwt");
const { test } = require("./controllers/authController");
const { Publish } = require("./controllers/pubController");
const path = require('path');
const { routeFavorite } = require("./routes/favoriteRoute");
const { reviewRouter } = require("./routes/reviewRoute");
app.use(cors());
app.use('/express/uploads',express.static(path.join(__dirname, 'uploads')));
// parse requests of content-type - application/json
app.use(express.json());
db.user.hasMany(db.publication,{as : 'ownedPublications',foreignkey: 'userId'});
db.publication.belongsTo(db.user, {as:'publisher',foreignKey : 'userId'});
db.publication.hasMany(db.favorite,{as : 'favorites',foreignKey:'publicationId'});
db.favorite.belongsTo(db.publication,{as:'prefferedPublication',foreignKey:'publicationId'});
db.user.hasMany(db.favorite,{as:'favoritesPubs',foreignKey:'userId'})
db.favorite.belongsTo(db.user,{as:'theOnePrefer',foreignKey:'userId'});
db.publication.hasMany(db.review,{as:'reviews',foreignKey: 'publicationId'});
db.review.belongsTo(db.publication,{as: 'publicationReview',foreignKey: 'publicationId'});
db.user.hasMany(db.review,{as:'userReviews',foreignkey: 'userId'});
db.review.belongsTo(db.user,{as:'reviewer',foreignKey:'userId'});
app.use(express.urlencoded({ extended: true }));
app.use("/auth",route);
app.use("/publish",[verifyToken,multer({ storage ,fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true)
    }}).single('image')],Publish)
app.use("/publication",verifyToken,router);
app.get("/test",verifyToken,test);
app.use("/favorites",verifyToken,routeFavorite);
app.use("/review",verifyToken,reviewRouter);
app.post("/send_message",(req,res)=> {

  db.message.create({
    name : req.body.name,
    email : req.body.email,
    message : req.body.message
  });
 
    res.json({message : "Message sent successfully"});
    return ;

  

});// set port, listen for requests
const PORT = process.env.PORT || 8080;
db.sequelize.sync().then((req)=>{
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  
})});