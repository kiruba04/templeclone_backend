import SpecialRegister from '../models/Specialpoojaregister.js';

export const addRegistration = async (req, res) => {
  try {
    const { userid, poojaid, date, day, tokennumber } = req.body;

    // Create a new registration
    const newSpecialRegister = new SpecialRegister({
      userid,
      poojaid,
      date,
      day,
      tokennumber,
    });

    // Save the registration
    const savedSpecialRegister = await newSpecialRegister.save();

    res.status(201).json(savedSpecialRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the registration by ID and delete it
    const deletedSpecialRegister = await SpecialRegister.findByIdAndDelete(id);

    if (!deletedSpecialRegister) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.status(200).json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRegistrationsByDate = async (req, res) => {
    try {
      const { poojaid, date } = req.query;
      const registrations = await SpecialRegister.find({ poojaid, date });
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
