const Post = require("../models/Post");
const User = require("../models/User");

//use user_id ( as it is user_id in db)
global.PostsData = [];

const getNearbyPosts = async (req, res) => {
    try {
        const { lat, lon, radius = 100 } = req.query; // Get latitude, longitude, and radius from query params

        if (!lat || !lon) {
            return res.status(400).json({ message: 'Latitude and Longitude are required' });
        }

        const maxDistance = radius * 1000; // Convert km to meters

        const posts = await Post.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lon, lat], maxDistance / 6378100] // Earth’s radius in meters
                }
            }
        });

        res.status(200).json({
            success: true,
            data: posts,
            message: `Fetched posts within ${radius} KM radius`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch nearby posts' });
    }
};

const getAllUserPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const kindOfPost = req.query.kind;
    try {
        const AnimalPostData = await Post.find({ kind: kindOfPost }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        global.PostsData = AnimalPostData;
        const totalPosts = await Post.countDocuments({ kind: kindOfPost });
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

const getAllCategoryPosts = async (req, res) => {
    const typeOfAnimal = req.query.animalType;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const kindOfPost = req.query.kind;
    try {
        const AnimalPostData = await Post.find({ kind: kindOfPost , animalType: typeOfAnimal}).sort({ createdAt: -1 }).skip(skip).limit(limit);
        global.PostsData = AnimalPostData;
        const totalPosts = await Post.countDocuments({ kind: kindOfPost });
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

const getMyOwnPosts = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        const AnimalPostData = await Post.find({ kind: "AnimalPost", user_id: userId }).sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPosts = await Post.countDocuments({ kind: "AnimalPost", user_id: userId });

        res.status(200).json({
            success: true,
            data: AnimalPostData,
            totalPosts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            msg: `Got all the animal posts for user ${userId}`
        });
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch the posts" });
    }

}

const createNewPost = async (req, res) => {
    const { user, description, images, phone, price, locationName } = req.body;
    try {
        console.log(user, description, images, phone, price, locationName);
        const newPost = new Post({ user, description, images, phone, price, locationName });
        await newPost.save();
        await User.findByIdAndUpdate(user,
            {
                $push: { posts: newPost._id }
            });
        res.status(200).json({ msg: `created New Post,${description},${phone}` });
    }
    catch (err) {
        res.status(500).json({ message: `Error while creating Post ${err.message}` })
    };
}

const updatePost = async (req, res) => {
    const post_id = req.params.id;  // Extract the post_id from the URL parameters
    const user_id = req.body.user;
    const dataToUpdate = req.body;

    console.log("Post ID:", req.params, "User ID:", user_id, "Data to update:", dataToUpdate);

    try {
        // Filter posts belonging to the user
        const myPosts = global.PostsData.filter((item) => String(item.user) === String(user_id));
        console.log("myPosts:", myPosts);

        // Find the specific post to update
        const postToUpdate = myPosts.find((item) => item._id.toString() === post_id);  // Ensure proper ObjectId comparison
        console.log("Post to update:", postToUpdate);

        if (!postToUpdate) {
            return res.status(404).json({ message: "No Post found to Update!" });
        }

        // Use findByIdAndUpdate to update the post
        const updatedPost = await Post.findByIdAndUpdate(post_id, dataToUpdate, { new: true });

        if (!updatedPost) {
            return res.status(500).json({ message: "Failed to update the post!" });
        }

        res.status(200).json({ message: "Updated Post Successfully", post: updatedPost });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};


const deletePost = async (req, res) => {
    const post_id = req.params.id;
    const user_id = req.params.user_id;
    console.log("post_id",post_id)
    try {
        const post = await Post.findById(post_id);
        if (!post) {
            res.status(500).json({ message: "Post is not present to delete" })
        }
        // if (post.user.toString() !== user_id.toString()) {
        //     res.status(500).json({ message: "You don't have permission to delete" })
        // }
        await Post.findByIdAndDelete(post_id);
        await User.findByIdAndUpdate(user_id, {
            $pull: { posts: post_id },
          });
        res.status(201).json({ message: "Post Deleted Successfully" })
    }
    catch (error) {
        res.status(500).json({ message: `Error while Deleting Post ${error.message}` })
    }
}


module.exports = { getAllUserPosts, createNewPost, getMyOwnPosts, deletePost, updatePost, getNearbyPosts , getAllCategoryPosts};
