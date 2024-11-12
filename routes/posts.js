const express = require("express");

const router = express.Router();

const { getAllUserPosts, createNewPost, getMyOwnPosts, deletePost, updatePost , getNearbyPosts,getAllCategoryPosts} = require("../controllers/posts");

router.route("/").get(getAllUserPosts);
router.route("/getCategory").get(getAllCategoryPosts);
router.route("/nearby").get(getNearbyPosts);
router.route("/create").post(createNewPost);
router.route("/myposts/user/:id").get(getMyOwnPosts);
router.route("/update/:id").put(updatePost);  //needs to be /update/:id
router.route("/delete/:id/:user_id").delete(deletePost);   //needs to be /delete/:id

module.exports = router;