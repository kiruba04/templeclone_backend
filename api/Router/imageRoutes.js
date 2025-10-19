import express from 'express';
import { addImage, getImage, getAllImages, deleteImage } from '../controller/imageController.js';

const router = express.Router();

// Route to add a new image
router.post('/', addImage);

// Route to get a specific image by ID
router.get('/:id', getImage);

// Route to get all images
router.get('/', getAllImages);

// Route to delete an image by ID
router.delete('/:id', deleteImage);

export default router;
