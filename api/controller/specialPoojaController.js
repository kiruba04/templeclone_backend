import SpecialPooja from '../models/SepicalPooja.js';

// Get all SpecialPoojas
export const getAllSpecialPoojas = async (req, res) => {
    try {
        const specialPoojas = await SpecialPooja.find();
        res.status(200).json(specialPoojas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get SpecialPooja by ID
export const getSpecialPoojaById = async (req, res) => {
    try {
        const specialPooja = await SpecialPooja.findById(req.params.id);
        if (!specialPooja) return res.status(404).json({ error: 'SpecialPooja not found' });
        res.status(200).json(specialPooja);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new SpecialPooja
export const createSpecialPooja = async (req, res) => {
    const { poojaname,poojaname_ta, poojacharges, noofperson, token, items, date, starttime, endtime, imageurls } = req.body;
    try {
        const newSpecialPooja = new SpecialPooja({ poojaname,poojaname_ta, poojacharges, noofperson, token, items, date, starttime, endtime, imageurls });
        await newSpecialPooja.save();
        res.status(201).json(newSpecialPooja);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update SpecialPooja
export const updateSpecialPooja = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSpecialPooja = await SpecialPooja.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSpecialPooja) return res.status(404).json({ error: 'SpecialPooja not found' });
        res.status(200).json(updatedSpecialPooja);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete SpecialPooja
export const deleteSpecialPooja = async (req, res) => {
    try {
        const deletedSpecialPooja = await SpecialPooja.findByIdAndDelete(req.params.id);
        if (!deletedSpecialPooja) return res.status(404).json({ error: 'SpecialPooja not found' });
        res.status(200).json({ message: 'SpecialPooja deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
