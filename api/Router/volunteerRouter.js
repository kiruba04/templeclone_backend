import express from 'express';
import { getUserByPhone,getUser, updateUser,getAllUsers,register } from '../controller/volunteer.js';

const router = express.Router();

router.get('/phone', getUserByPhone);
router.get('/', getUser);
router.put('/:id', updateUser); 
router.get('/alluser',getAllUsers);
router .post('/register',register);

export default router;
