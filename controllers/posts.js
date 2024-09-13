const Post = require("../models/Post");

const getAllUserPosts = async (req, res) => {
    const PostsData = await Post.find({});
    res.status(200).json({ msg: `Got all the Posts ${PostsData[0].title}` });
}

const createNewPost = async (req, res) => {
    try{
        // const {user,description,images,phone,price,location}=req.body;
        // console.log(user,description,images,phone,price,location);
        const {title,content}=req.body;
        // const newPost=new Post({user,description,images,phone,price,location});
        const newPost = new Post({title,content});
        await newPost.save();
        res.status(200).json({ msg: `created New Post,${content},${title}` });
    }
    catch (err)
    {
        res.status(500).json({message:"Error while creating Post"})
    };
}



module.exports = { getAllUserPosts, createNewPost };
