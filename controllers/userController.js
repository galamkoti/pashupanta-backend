const express = require("express");
const User = require("../models/User");
const bcrypt=require("bcrypt");

const getUserInfo = async (req, res) => {
    try {
        const UserInfo = await User.find({phone:req.body.phone});
        console.log(UserInfo);
        res.status(201).json({ message: `Got User Info = ${UserInfo}` });
    }
    catch (err) {
        res.status(500).json({ message: `unable to get User Info from DB,${err.message}` });
    }
}

//this should be done while registering (Not working as expected)
const createUser = async (req, res) => {
    try {
        const { phone,password,userName} = req.body;
        console.log(req.body)
        const userExisted = await User.findOne({phone:phone});
        console.log("userExisted",userExisted);
        if(userExisted){
            const isMatch = await bcrypt.compare(password,userExisted.password);
            if(isMatch){
                res.status(200).json({message:"User Already Existed",user:userExisted});
            }
            else{
                res.status(200).json({message:"Your Password Is Incorrect"});
            }
            return;
        }
        else{
            const hashedPassword= await bcrypt.hash(password,10);
            const newUser = new User({ name:"Koti", phone ,password:hashedPassword});
            console.log("here in new user",newUser)
            await newUser.save();
            res.status(200).json({ message: "created New User" , user:newUser});
            return;
        }
    }
    catch (err) {
        res.status(500).json({ message: `unable to create User in DB,${err.message}` });
    }
}

const updateUserProfile = async (req, res) => {
    const user_id = req.params.id;
    const profileToUpdate = req.body;
    console.log("user_id", user_id, profileToUpdate)
    try {
        if (!user_id) {
            res.status(500).json({ message: "No User Id Found" })
        }
        const updatedProfile = await User.findByIdAndUpdate(user_id, profileToUpdate, { new: true });
        res.status(201).json({ message: "Profile Updated Successfully", user: updatedProfile })
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { getUserInfo, createUser, updateUserProfile };