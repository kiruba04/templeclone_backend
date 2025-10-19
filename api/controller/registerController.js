import Register from '../models/Register.js';

export const addRegistration = async (req, res) => {
  try {
    const { userid, poojaid, date, day, tokennumber } = req.body;

    // Create a new registration
    const newRegister = new Register({
      userid,
      poojaid,
      date,
      day,
      tokennumber,
    });

    // Save the registration
    const savedRegister = await newRegister.save();

    res.status(201).json(savedRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the registration by ID and delete it
    const deletedRegister = await Register.findByIdAndDelete(id);

    if (!deletedRegister) {
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
      const registrations = await Register.find({ poojaid, date });
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getRegistrationsForNextFiveDays = async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to the start of the day
      const fiveDaysLater = new Date(today);
      fiveDaysLater.setDate(today.getDate() + 5);
  
      const registrations = await Register.find({
        date: {
          $gte: today,
          $lt: fiveDaysLater
        }
      }).populate('userid').populate('poojaid');
  
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getRegistrationsForDateRange = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and end date are required' });
      }
  
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0); // Set time to the start of the day
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Set time to the end of the day
      const registrations = await Register.find({
        date: {
          $gte: start,
          $lte: end
        }
      }).populate('userid').populate('poojaid');
  
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  