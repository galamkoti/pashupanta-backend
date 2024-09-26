require("dotenv").config();
const twilio = require('twilio');
const User = require("../models/User");

const twilioSID=process.env.TWILIO_SID;
const twilio_authToken=process.env.TWILIO_AUTHTOKEN;
const twilio_verify_service_id=process.env.TWILIO_verifyServiceSid;

const twilioClient=twilio(twilioSID,twilio_authToken);

const sendOTP = async (req,res)=>{
    let {phoneNumber}=req.body;
    console.log(phoneNumber)
     // Ensure phone number includes country code +91 for India
     if (!phoneNumber.startsWith('+91')) {
        phoneNumber = `+91${phoneNumber}`;
    }
    twilioClient.verify.v2.services(twilio_verify_service_id).verifications.create({to: `${phoneNumber}`,channel:"sms"})
    .then(
        verification=>{
            res.status(200).send({success:true,message:'OTP Sent',verification});
        }
    )
    .catch(err=>{
        console.log("errin sending sms",err)
        res.status(500).send({success:false,message:err.message})
    })
}

const verifyOTP = async(req,res)=>{
    let {phoneNumber,code}=req.body;
     // Ensure phone number includes country code +91 for India
    
    console.log(phoneNumber)
    try {
        const verificationCheck = await twilioClient.verify.v2.services(twilio_verify_service_id)
          .verificationChecks
          .create({ to: `+91${phoneNumber}`, code: code });
        console.log(verificationCheck)
        if (verificationCheck.status == 'approved') {
            console.log("inside approved")
          // Check if user already exists
          let user = await User.findOne({ phone:phoneNumber });
          console.log("user",user)
    
          // If the user doesn't exist, create a new one
          if (!user) {
            user = new User({ name:'Koti',phone:phoneNumber, verified: true,email:"koti145@gmail.com" });
            await user.save();
          }
          res.status(200).send({ success: true, message: 'Phone number verified!', user });
        } else {
          res.status(400).send({ success: false, message: 'Invalid OTP' });
        }
      } catch (error) {
        console.log("in otp verify",error.message)
        res.status(500).send({ success: false, message: error.message });
      }
}

module.exports={sendOTP,verifyOTP};