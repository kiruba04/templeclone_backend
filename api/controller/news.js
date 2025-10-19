import News from "../models/News.js"; // Adjust the path based on your project structure

// Create a news entry
export const createNews = async (req, res) => {
  try {
    const { newsheadlines_en, newsheadlines_ta } = req.body;

    const newNews = new News({
      newsheadlines_en,
      newsheadlines_ta,
    });

    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(500).json({ message: "Error creating news", error });
  }
};

// Retrieve all news entries
export const getNews = async (req, res) => {
  try {
    const newsList = await News.find();
    res.status(200).json(newsList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving news", error });
  }
};

// Update a news entry by ID
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNews = await News.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: "Error updating news", error });
  }
};

// Delete a news entry by ID
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
  }
};
