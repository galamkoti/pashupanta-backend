const express = require("express");

const router = express.Router();

const { getAllUserPosts, createNewPost } = require("../controllers/posts");

router.route("/").get(getAllUserPosts);
router.route("/create").post(createNewPost);
// router.route("/").put(updatePost);
// router.route("/").delete(deletePost);

module.exports=router;