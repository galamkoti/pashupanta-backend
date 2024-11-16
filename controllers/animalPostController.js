const AnimalPost = require("../models/AnimalPost");
const Post = require("../models/Post");
const User = require("../models/User");
const {upload}=require('../config/cloudinary');


const getAnimalPosts = async (req, res) => {
  const typeOfAnimal = req.query.animalType;
  console.log("animalType", typeOfAnimal)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  const sortOnPrice={ price: -1 };
  try {
    const AnimalPostData = await Post.find({ kind: "AnimalPost", animalType: typeOfAnimal }).sort(sortOnPrice).skip(skip).limit(limit);
    const totalPosts = await Post.countDocuments({ kind: "AnimalPost" });
    res.status(200).json({
      success: true,
      data: AnimalPostData,
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      msg: `Got all the Posts ${AnimalPostData}`
    });
  }
  catch (error) {
    res.status(500).json({ msg: "failed to fetch the posts" });
  }
}

const createAnimalPost = async (req, res) => {
  const {
    user_id,
    description,
    phone,
    price,
    // latitude,
    // longitude,
    locationName,
    category,
    breed,
    age,
    lactationPeriod,
    hasChild,
    milkCapacity,
    pregnancyStatus,
    isBargainable,
  } = req.body;
  console.log("re body",req.body);
  
  // Extract both images and video
  const images = [];
  let video;

  // Use Cloudinary's upload method or another service to upload files (image or video)
  // Assuming `req.files` has both images and video
  req.files.forEach((file) => {
    if (file.mimetype.startsWith("image/")) {
      images.push(file.path); // add image URL
    } else if (file.mimetype.startsWith("video/")) {
      video = file.path; // add video URL
    }
  });
  
  const newAnimalPost = new AnimalPost({
    user_id,
    description,
    images,
    videos:video,
    phone,
    price,
    // location: {
    //   type: 'Point',
    //   coordinates: [longitude, latitude],
    // },
    locationName,
    animalType: category,
    breed,
    age,
    lactationPeriod,
    hasChild,
    milkCapacity,
    pregnancyStatus,
    isBargainable,
  });

  try {
    await newAnimalPost.save();
    await User.findByIdAndUpdate(user_id, {
      $push: { posts: newAnimalPost._id },
    });
    res.status(201).json({ message: 'Animal Post Created!!',singlePostData:newAnimalPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
}
module.exports = { createAnimalPost, getAnimalPosts };