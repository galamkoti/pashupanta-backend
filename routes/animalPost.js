const express = require("express");
const {upload}=require('../config/cloudinary');

const router = express.Router();

const { createAnimalPost ,getAnimalPosts } = require("../controllers/animalPostController");


router.route("/create").post( upload.array('media'),createAnimalPost);
router.route("/").get(getAnimalPosts);

module.exports = router;