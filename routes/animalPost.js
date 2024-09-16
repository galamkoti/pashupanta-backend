const express = require("express");

const router = express.Router();

const { createAnimalPost ,getAnimalPosts } = require("../controllers/animalPostController");


router.route("/create").post(createAnimalPost);
router.route("/").get(getAnimalPosts);

module.exports = router;