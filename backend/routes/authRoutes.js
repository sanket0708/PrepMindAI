const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController.js");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware.js");
const cloudinary = require("../config/cloudinary.js");

const router = express.Router();

//auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return res.status(500).json({
        message: "Cloudinary is not configured on the server.",
      });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;

    const uploadedImage = await cloudinary.uploader.upload(base64Image, {
      folder: "prepmindai/avatars",
      resource_type: "image",
    });

    return res.status(200).json({ imageUrl: uploadedImage.secure_url });
  } catch (error) {
    return res.status(500).json({
      message: "Image upload failed!",
      error: error.message,
    });
  }
});

module.exports = router;
