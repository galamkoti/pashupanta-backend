const Post = require("../models/Post");
const User = require("../models/User");

global.PostsData = [];
const getAllUserPosts = async (req, res) => {
    global.PostsData = await Post.find({});
    res.status(200).json({ msg: `Got all the Posts ${PostsData}` });
}

const getMyOwnPosts = async (req, res) => {
    try {
        const user_id = req.body.id;
        if (!user_id) {
            return res.status(400).json({ message: "User ID not provided in the request body" });
        }
        console.log("user id", user_id, global.PostsData)
        if (!global.PostsData || !Array.isArray(global.PostsData)) {
            return res.status(500).json({ message: "PostsData is not available or is not an array" });
        }
        const myPostsData = global.PostsData.filter((item) => String(item.user) == String(user_id));
        console.log("My Posts", myPostsData);
        if (myPostsData.length == 0) {
            return res.status(404).json({ message: "No posts found for the given user" });
        }
        res.status(200).json({ message: myPostsData });
    } catch (error) {
        res.status(500).json({ message: `Error while fetching  My Posts ${error.message}` })
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
                $push:{posts:newPost._id}
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

//need to send post_id and user_id 
const deletePost = async (req, res) => {
    const post_id = req.body.id;
    const user_id = req.body.user;
    try {
        const post = await Post.findById(post_id);
        if (!post) {
            res.status(500).json({ message: "Post is not present to delete" })
        }
        if (post.user.toString() !== user_id.toString()) {
            res.status(500).json({ message: "You don't have permission to delete" })
        }
        await Post.findByIdAndDelete(post_id);
        res.status(201).json({ message: "Post Deleted Successfully" })
    }
    catch (error) {
        res.status(500).json({ message: `Error while Deleting Post ${error.message}` })
    }
}


module.exports = { getAllUserPosts, createNewPost, getMyOwnPosts, deletePost, updatePost };
