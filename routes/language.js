const express=require("express");
const { langController } = require("../controllers/languageController");

const router=express.Router();

router.route("/").get(langController);


module.exports=router;