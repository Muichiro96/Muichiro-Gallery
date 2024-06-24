const express = require("express");
const cors = require("cors");
const {route} = require("./routes/authRoute");
const app = express();
const { router} = require("./routes/pubsRoute");
const db = require("./models");

const verifyToken = require("./middlewares/authJwt");
const { test } = require("./controllers/authController");
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
db.user.hasMany(db.publication,{as : 'ownedPublications',foreignkey: 'userId'});
db.publication.belongsTo(db.user, {as:'publisher',foreignKey : 'userId'});

app.use(express.urlencoded({ extended: true }));
app.use("/auth",route);
app.use("/publication",verifyToken,router);
app.get("/test",verifyToken,test);
app.get('/create', (req, res) => {
  db.user.create({
    username: "hamid",
    email: "ouss1252002",
    password: "ouss",
    isAdmin: true
  }).then((results=>{
    res.json({ message: results });
  })).catch(error=> {res.json({tes: error})})
  
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
db.sequelize.sync().then((req)=>{
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  
})});