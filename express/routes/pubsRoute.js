const pubCtrl =require("../controllers/pubController");
const express = require("express");
const router = express.Router();
router.route("/list").get(pubCtrl.getPublications);
router.route("/:id/:title").get(pubCtrl.getPublication);
exports.router = router;