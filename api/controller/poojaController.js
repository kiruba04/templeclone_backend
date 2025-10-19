import Pooja from '../models/Pooja.js';

// Add a new Pooja
export const addPooja = async (req, res) => {
  try {
    const newPooja = new Pooja(req.body);
    const savedPooja = await newPooja.save();
    res.status(201).json(savedPooja);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Poojas
export const getAllPoojas = async (req, res) => {
  try {
    const poojas = await Pooja.find();
    res.status(200).json(poojas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Pooja by ID
export const getPoojaById = async (req, res) => {
  try {
    const pooja = await Pooja.findById(req.params.id);
    if (!pooja) return res.status(404).json({ message: 'Pooja not found' });
    res.status(200).json(pooja);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Pooja by ID
export const updatePooja = async (req, res) => {
  try {
    const updatedPooja = await Pooja.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPooja) return res.status(404).json({ message: 'Pooja not found' });
    res.status(200).json(updatedPooja);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Pooja by ID
export const deletePooja = async (req, res) => {
  try {
    const deletedPooja = await Pooja.findByIdAndDelete(req.params.id);
    if (!deletedPooja) return res.status(404).json({ message: 'Pooja not found' });
    res.status(200).json({ message: 'Pooja deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
