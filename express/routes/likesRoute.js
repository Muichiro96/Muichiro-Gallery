const express = require("express");
const {likeBtn, getUserLikesDislikes}= require("../controllers/likeController");
const likesrouter = express.Router();
likesrouter.route('/handle').post(likeBtn);
likesrouter.route('/list').get(getUserLikesDislikes);
exports.likesrouter=likesrouter;
