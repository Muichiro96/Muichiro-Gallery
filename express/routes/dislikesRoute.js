const express = require("express");
const {dislikeBtn}= require("../controllers/dislikeController");
const dislikesrouter = express.Router();
dislikesrouter.route('/handle').post(dislikeBtn);
exports.dislikesrouter=dislikesrouter;