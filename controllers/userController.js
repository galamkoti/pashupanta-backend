const express = require("express");
const User = require("../models/User");

const getUserInfo = async (req, res) => {
    try {
        const UserInfo = await User.find({});
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
        const { name, phone } = req.body;
        const newUser = new User({ name, phone });
        await newUser.save();
        res.status(201).json({ message: "Saved User Info In DB" });
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