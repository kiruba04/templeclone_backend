import Thirukalayanam from '../models/Thirukalyanam.js';

// Add a new entry
export const addThirukalayanam = async (req, res) => {
    try {
        const newEntry = new Thirukalayanam(req.body);
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all entries
export const getAllThirukalayanam = async (req, res) => {
    try {
        const entries = await Thirukalayanam.find();
        res.status(200).json(entries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an entry by ID
export const updateThirukalayanam = async (req, res) => {
    try {
        const updatedEntry = await Thirukalayanam.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an entry by ID
export const deleteThirukalayanam = async (req, res) => {
    try {
        await Thirukalayanam.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getEventByDate = async (req, res) => {
    try {
      const event = await Thirukalayanam.findOne({ date: req.query.date });
      res.json(event ? [event] : []);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };