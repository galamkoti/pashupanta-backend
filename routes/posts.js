const express = require("express");

const router = express.Router();

const { getAllUserPosts, createNewPost, getMyOwnPosts, deletePost, updatePost } = require("../controllers/posts");

router.route("/").get(getAllUserPosts);
router.route("/create").post(createNewPost);
router.route("/myposts/user/:id").get(getMyOwnPosts);
router.route("/update/:id").put(updatePost);  //needs to be /update/:id
router.route("/delete").delete(deletePost);   //needs to be /delete/:id

module.exports = router;