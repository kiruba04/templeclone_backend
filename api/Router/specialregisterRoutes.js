import express from 'express';
import { addRegistration, deleteRegistration,getRegistrationsByDate } from '../controller/specialregistercontroller.js';

const router = express.Router();

router.post('/register', addRegistration);
router.delete('/register/:id', deleteRegistration);
router.get('/register/bydate', getRegistrationsByDate);
export default router;
