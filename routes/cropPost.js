const express = require("express");
const { createCropPost ,getCropsPosts} = require("../controllers/cropPostController");

const router = express.Router();

router.route("/").get(getCropsPosts);
router.route("/create").post(createCropPost);

module.exports = router;