const express = require("express");
const router = express.Router();
router.route("/list").get();
router.route("/:id").get();
exports.router = router;