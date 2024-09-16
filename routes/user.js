const express=require("express");
const { getUserInfo, createUser, updateUserProfile } = require("../controllers/userController");

const router=express.Router();

router.route("/").get(getUserInfo);
router.route("/create").post(createUser);  
router.route("/update/:id").put(updateUserProfile);


module.exports=router;