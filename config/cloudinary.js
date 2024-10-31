const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for images/videos
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'animal_posts', // Folder where images/videos will be stored
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4'], // Accepted formats
    resource_type: 'auto',  // Automatically detect image or video
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };
