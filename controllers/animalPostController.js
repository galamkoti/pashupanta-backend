const AnimalPost = require("../models/AnimalPost");
const Post = require("../models/Post");
const User = require("../models/User");


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
    images,
    phone,
    price,
    latitude,
    longitude,
    category,
    breed,
    age,
    lactationPeriod,
    hasChild,
    milkCapacity,
    pregnancyStatus,
    isBargainable,
  } = req.body;


  const newAnimalPost = new AnimalPost({
    user_id,
    description,
    images,
    phone,
    price,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude],
    },
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
    res.status(201).json({ message: 'Animal Post Created!!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
}
module.exports = { createAnimalPost, getAnimalPosts };