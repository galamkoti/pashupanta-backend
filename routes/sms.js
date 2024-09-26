const express=require("express");

const router=express.Router();
const {sendOTP,verifyOTP}=require("../controllers/smsController");
router.route("/send-otp").post(sendOTP);
router.route("/verify-otp").post(verifyOTP);

module.exports=router;