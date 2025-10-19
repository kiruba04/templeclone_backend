import express from 'express';
import { sendResponse,getAllResponses } from '../controller/responseController.js';

const router = express.Router();

// POST route to send response and store it
router.post('/send', sendResponse);
router.get('/all', getAllResponses);

export default router;
