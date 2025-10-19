import Uthchavam from '../models/Uthchavam.js'; // Adjust the path as per your directory structure

// Create a new Uthchavam
export const createUthchavam = async (req, res) => {
    try {
        const newUthchavam = new Uthchavam(req.body);
        const savedUthchavam = await newUthchavam.save();
        res.status(201).json(savedUthchavam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Uthchavams
export const getAllUthchavams = async (req, res) => {
    try {
        const uthchavams = await Uthchavam.find();
        res.status(200).json(uthchavams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Uthchavam by ID
export const getUthchavamById = async (req, res) => {
    try {
        const { id } = req.params;
        const uthchavam = await Uthchavam.findById(id);
        if (!uthchavam) {
            return res.status(404).json({ message: 'Uthchavam not found' });
        }
        res.status(200).json(uthchavam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Uthchavam by ID
export const updateUthchavamById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUthchavam = await Uthchavam.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedUthchavam) {
            return res.status(404).json({ message: 'Uthchavam not found' });
        }
        res.status(200).json(updatedUthchavam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Uthchavam by ID
export const deleteUthchavamById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUthchavam = await Uthchavam.findByIdAndDelete(id);
        if (!deletedUthchavam) {
            return res.status(404).json({ message: 'Uthchavam not found' });
        }
        res.status(200).json({ message: 'Uthchavam deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
