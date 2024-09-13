const express=require("express");
const { getUserInfo, createUser } = require("../controllers/userController");

const router=express.Router();

router.route("/").get(getUserInfo);
router.route("/create").post(createUser);   


module.exports=router;