import express from "express";
import { createNews, getNews, updateNews, deleteNews } from "../controller/news.js"; // Adjust the path based on your project structure

const router = express.Router();

// Route to create a news entry
router.post("/", createNews);

// Route to retrieve all news entries
router.get("/", getNews);

// Route to update a news entry by ID
router.put("/:id", updateNews);

// Route to delete a news entry by ID
router.delete("/:id", deleteNews);

export default router;