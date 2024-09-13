const express = require("express");
const User = require("../models/User");

const getUserInfo = async (req,res) =>{
    try{
        const UserInfo=await User.find({});
        console.log(UserInfo);
        res.status(201).json({message:"Got User Info"});
    }
    catch(err){
        res.status(500).json({message:`unable to get User Info from DB,${err.message}`});
    }
}

const createUser = async (req,res) => {
    try{
        const {name,phone} = req.body;
        const newUser = new User({name,phone});
        await newUser.save();
        res.status(201).json({message:"Saved User Info In DB"});
    }
    catch(err){
        res.status(500).json({message:`unable to create User in DB,${err.message}`});
    }
}

module.exports={getUserInfo,createUser};