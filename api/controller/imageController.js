import Image from '../models/Image.js'; // Import the Image model

// Add a new image
export const addImage = async (req, res) => {
  try {
    const { url } = req.body;
    const newImage = new Image({ url });
    await newImage.save();
    res.status(201).json({ success: true, image: newImage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a specific image by ID
export const getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ success: false, message: "Image not found" });
    res.status(200).json({ success: true, image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({ success: true, images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an image by ID
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ success: false, message: "Image not found" });
    res.status(200).json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
