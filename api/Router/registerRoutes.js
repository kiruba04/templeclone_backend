import express from 'express';
import { addRegistration, deleteRegistration,getRegistrationsByDate,getRegistrationsForNextFiveDays,getRegistrationsForDateRange } from '../controller/registerController.js';

const router = express.Router();

router.post('/register', addRegistration);
router.delete('/register/:id', deleteRegistration);
router.get('/register/bydate', getRegistrationsByDate);
router.get('/register/nextfive', getRegistrationsForNextFiveDays);
router.get('/register/range', getRegistrationsForDateRange);

export default router;
